import { AdvancedSearchOptions, SearchFilter, SearchOptions } from '../types';
import connectToMongo from './connectToMongo';

function escapeRegExp(regexString: string) {
  return regexString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchFilter(searchOptions: SearchOptions): SearchFilter {
  const filter = {} as SearchFilter;
  if (searchOptions.name) {
    filter.name = {
      $regex: escapeRegExp(searchOptions.name),
      $options: 'i',
    };
  }
  if (searchOptions.species.length) {
    filter.species = { $in: searchOptions.species };
  }
  if (searchOptions.personality.length) {
    filter.personality = { $in: searchOptions.personality };
  }
  if (searchOptions.gender !== 'All') {
    filter.gender = searchOptions.gender;
  }
  return filter;
}

async function basicSearchMongo(filter: SearchFilter): Promise<string[]> {
  const db = await connectToMongo();
  const searchResults = await db
    .collection('data')
    .find(filter)
    .project({ name: 1, _id: 0 })
    .toArray();

  return searchResults.map((a) => a.name);
}

export default async function searchMongo(
  searchOptions: SearchOptions,
  advancedSearchOptions: AdvancedSearchOptions
): Promise<string[]> {
  const filter = searchFilter(searchOptions);
  const db = await connectToMongo();
  const { fromDate, toDate } = advancedSearchOptions;
  const fromDateDate = new Date(fromDate + 'T00:00:00Z');
  const toDateDate = new Date(toDate + 'T23:59:59Z');

  if (Object.keys(filter).length) {
    if (advancedSearchOptions.residence === 'Non-residents only') {
      // find non-residents with matching traits
      // search 'data' for traits and filter out matching 'history' entries
      return db
        .collection('data')
        .aggregate([
          { $match: searchFilter(searchOptions) },
          { $project: { name: 1, _id: 0 } },
          {
            $lookup: {
              from: 'history',
              localField: 'name',
              foreignField: 'name',
              as: 'matchingDocs',
            },
          },
          { $match: { matchingDocs: { $size: 0 } } },
          { $project: { name: 1, _id: 0 } },
        ])
        .toArray()
        .then((res) => res.map((a) => a.name));
    } else if (advancedSearchOptions.residence === 'Residents only') {
      // find residents with matching traits
      // search 'data' for traits, use resulting array to filter 'history' entries
      return basicSearchMongo(filter)
        .then((res) =>
          db
            .collection('history')
            .find({
              $or: [
                {
                  startDate: { $lte: toDateDate },
                  endDate: { $gte: fromDateDate },
                },
                {
                  startDate: { $lte: toDateDate },
                  endDate: { $exists: false },
                },
              ],
              name: { $in: res },
            })
            .project({ name: 1, _id: 0 })
            .toArray()
        )
        .then((res) => res.map((a) => a.name));
    } else {
      // find all villagers with matching traits
      return basicSearchMongo(filter);
    }
  } else {
    if (advancedSearchOptions.residence === 'Residents only') {
      // find residents within date range
      return db
        .collection('history')
        .find({
          $or: [
            {
              startDate: { $lte: toDateDate },
              endDate: { $gte: fromDateDate },
            },
            {
              startDate: { $lte: toDateDate },
              endDate: { $exists: false },
            },
          ],
        })
        .project({ name: 1, _id: 0 })
        .toArray()
        .then((res) => res.map((a) => a.name));
    } else {
      // find non-residents
      return db
        .collection('data')
        .aggregate([
          { $project: { name: 1, _id: 0 } },
          {
            $lookup: {
              from: 'history',
              localField: 'name',
              foreignField: 'name',
              as: 'matchingDocs',
            },
          },
          { $match: { matchingDocs: { $size: 0 } } },
          { $project: { name: 1, _id: 0 } },
        ])
        .toArray()
        .then((res) => res.map((a) => a.name));
    }
    // no traits, no residence filter -> return all villagers (handled by frontend)
  }
}
