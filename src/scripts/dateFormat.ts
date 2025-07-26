import type { CollectionEntry } from "astro:content";

/**
 * Given a list of entries, group each entry as value by the same date
 * and as the key, the date.
 * If date is /, it will group by year
 * else if date is /year/, it will group by month
 * else if date is /year/month/, it will group by day
 * else if date is /year/month/day it will show all of the day
 * Once thing to take into account: Because the index could be year
 * I changed the object creation by a Map, as stated in:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Objects_and_maps_compared
 * - https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
 * This way, when iterating in the JSX template, the index order is preserved, otherwise,
 * the smallest number would be the first one. To solved that part, I recon to this post:
 * - https://stackoverflow.com/questions/35590621/foreach-over-es6-map-in-jsx
 * Where I could iterate as object of objects.
 * @param arr array of entries
 * @return { [x: string]: objects[]; } Object of letter: words 
 */
export const groupByDate = <
  C extends "post" | "project"
>(
  entries: CollectionEntry<C>[],
  dateType: "year" | "month" | "day" | "hour" | "",
  dateKey: "pubDate" | "modDate"
): Map<string, CollectionEntry<C>[]> => {
  const sortedEntries = [...entries].sort((a:any, b:any) => {
    const dateA = a.data[dateKey].getTime();
    const dateB = b.data[dateKey].getTime();
    return dateB - dateA;
  });

  const entriesMap = new Map<string, CollectionEntry<C>[]>();

  for (const entry of sortedEntries) {
    const entryDate = entry.data[dateKey];
    const year = entryDate.getFullYear().toString();
    const month = (entryDate.getMonth() + 1).toString().padStart(2, "0");
    const day = entryDate.getDate().toString().padStart(2, "0");
    const hour = entryDate.getHours().toString().padStart(2, "0");

    let keyDate = year;
    if (dateType === "month") keyDate = `${year}-${month}`;
    else if (dateType === "day") keyDate = `${year}-${month}-${day}`;
    else if (dateType === "hour") keyDate = `${year}-${month}-${day} ${hour}:00`;

    const group = entriesMap.get(keyDate) ?? [];
    group.push(entry);
    entriesMap.set(keyDate, group);
  }

  return entriesMap;
};

export const dateToStr = (date:Date) => {
  return `${date.getFullYear().toString()}-`+`${(date.getMonth()+1).toString().padStart(2, "0")}-`+`${date.getDate().toString().padStart(2, "0")}`
}

/*
* Just in case, I found out an easy way following the ES6 / ES2015 spec to order
* as a list of objects:
* - https://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
*/
// const entriesGroupedOrdered = Object.entries(entriesGrouped)
//   .sort(([keyA], [keyB]) => new Date(keyB).getTime() - new Date(keyA).getTime())
//   .reduce((obj, [key,value]) => Object.assign(obj, {[key]: value}), {})
// console.log(entriesGroupedOrdered)