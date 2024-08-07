 //// Utility function for currency formatting
const formatCurrency = (value, locale = 'en-GH', currency = 'GHS') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency,minimumFractionDigits: 0,
    maximumFractionDigits: 0, }).format(value);
  };
  
  // Utility function to format as percentage
  const formatPercentage = (value, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value);
  };
  
 
 
 //Combining the Arrays for the Budget--returns an array of objects , map returns an array which also returns an inner object.

//Flattening a result typically means taking a nested structure and reducing it to a simpler, one-level structure. In the context of arrays, it means converting an array of arrays into a single array that contains all the elements of the nested arrays.

//flatMap iterates over each planItem in the planInc array.
//For each planItem, it filters the actualInc array to find all actualItems with the same parent.
//If there are no matching actual items, it returns an array with a single object where actualAmount is 0.
//If there are matching actual items, it maps over these items to create an array of combined objects.
//flatMap flattens the resulting arrays into a single array, combining all the elements into one level.
//Flattening: Reduces a nested structure to a simpler, one-level structure.
//const nestedArray = [[1, 2], [3, 4], [5, 6]];
//const flattenedArray = [1, 2, 3, 4, 5, 6];
// const combinedFilteredItems = (planInc, actualInc, totalPlanIncome, totalActIncome) => {

//     // Create a map to track actual items by their parent -- {parent1:[{}], parent2:[{}]}
//    const actualItemsMap= actualInc.reduce((map,actualItem)=>{
//      if(!map[actualItem.parent]){
//        map[actualItem.parent]=[];
//      }
//      map[actualItem.parent].push(actualItem)
//    return map;
//    },{})
   
//    // Combine plan and actual items
//    const combinedItems = planInc.flatMap((planItem)=>{
//    const matchingActualItems = actualItemsMap[planItem.parent] || [];
   
//    if(matchingActualItems.length === 0){
//      return ([
//    {
   
//      planParent: planItem.parent,
//            planAmount: planItem.amount || 0,
//            planPercentage: formatPercentage(planItem.amount / totalPlanIncome),
//            actualParent: '',
//            actualAmount: 0,
//            actualPercentage: formatPercentage(0)
//    }])
//    }
//    return matchingActualItems.map((actualItem)=>({
//      planParent: planItem.parent,
//          planAmount: planItem.amount || 0,
//          planPercentage: formatPercentage(planItem.amount / totalPlanIncome),
//          actualParent: actualItem.parent,
//          actualAmount: actualItem.amount || 0,
//          actualPercentage: formatPercentage(actualItem.amount / totalActIncome)
//    }))
   
//    })
//     // Add actual items that don't have a corresponding plan item
//     actualInc.forEach((actualItem)=>{
//      if(!planInc.find((planItem)=>planItem.parent === actualItem.parent)){
//        combinedItems.push({
//          planParent: '',
//          planAmount: 0,
//          planPercentage: formatPercentage(0),
//          actualParent: actualItem.parent,
//          actualAmount: actualItem.amount || 0,
//          actualPercentage: formatPercentage(actualItem.amount / totalActIncome)
//        });
//      }
//     })
   
//    return combinedItems
   
//    };
  
// export default combinedFilteredItems;  

/////////////////////////////////////

// Explanation
// Aggregate Plan and Actual Amounts:

// Use reduce to create maps (planItemsMap and actualItemsMap) that aggregate the amounts for each parent.
// Sum the amounts for each parent key.
// Combine Plan and Actual Items:

// Use Object.keys(planItemsMap) to iterate over the aggregated plan items.
// For each parent, create a combined object with the summed planAmount and actualAmount.
// Add Missing Plan and Actual Items:

// Iterate over actualItemsMap to add items that don't have a corresponding plan item.
// Iterate over planItemsMap to add items that don't have a corresponding actual item.
// Return Combined Items:

// The resulting combinedItems array contains aggregated and combined plan and actual items.

//Using Parent as the key
const combinedFilteredItems = (planInc, actualInc, totalPlanIncome, totalActIncome) => {
  // Aggregate plan amounts by parent
  const planItemsMap = planInc.reduce((map, planItem) => {
    if (!map[planItem.parent]) {
      map[planItem.parent] = { amount: 0 };
    }
    map[planItem.parent].amount += parseInt(planItem.amount);
    return map;
  }, {});

  // Aggregate actual amounts by parent
  const actualItemsMap = actualInc.reduce((map, actualItem) => {
    if (!map[actualItem.parent]) {
      map[actualItem.parent] = { amount: 0 };
    }
    map[actualItem.parent].amount += parseInt(actualItem.amount);
    return map;
  }, {});

  // Combine plan and actual items
  const combinedItems = Object.keys(planItemsMap).flatMap((parent) => {
    const planAmount = planItemsMap[parent].amount || 0;
    const actualAmount = actualItemsMap[parent]?.amount || 0;

    return [{
      planParent: parent,
      planAmount: planAmount,
      planPercentage: formatPercentage(planAmount / totalPlanIncome),
      actualParent: parent,
      actualAmount: actualAmount,
      actualPercentage: formatPercentage(actualAmount / totalActIncome)
    }];
  });

  // Add actual items that don't have a corresponding plan item
  Object.keys(actualItemsMap).forEach((parent) => {
    if (!planItemsMap[parent]) {
      const actualAmount = actualItemsMap[parent].amount;
      combinedItems.push({
        planParent: '',
        planAmount: 0,
        planPercentage: formatPercentage(0),
        actualParent: parent,
        actualAmount: actualAmount,
        actualPercentage: formatPercentage(actualAmount / totalActIncome)
      });
    }
  });

  // Add plan items that don't have a corresponding actual item
  Object.keys(planItemsMap).forEach((parent) => {
    if (!actualItemsMap[parent]) {
      const planAmount = planItemsMap[parent].amount;
      combinedItems.push({
        planParent: parent,
        planAmount: planAmount,
        planPercentage: formatPercentage(planAmount / totalPlanIncome),
        actualParent: '',
        actualAmount: 0,
        actualPercentage: formatPercentage(0)
      });
    }
  });

  return combinedItems;
};

export default combinedFilteredItems;  

//Using Parent as the key
const combinedFilteredItems2 = (planInc, actualInc, totalPlanIncome, totalActIncome) => {
  // Aggregate plan amounts by parent
  const planItemsMap = planInc.reduce((map, planItem) => {
    if (!map[planItem.parent]) {
      map[planItem.parent] = { amount: 0 };
    }
    map[planItem.parent].amount += parseInt(planItem.amount);
    return map;
  }, {});

  // Aggregate actual amounts by parent
  const actualItemsMap = actualInc.reduce((map, actualItem) => {
    if (!map[actualItem.parent]) {
      map[actualItem.parent] = { amount: 0 };
    }
    map[actualItem.parent].amount += parseInt(actualItem.amount);
    return map;
  }, {});

  // Combine plan and actual items
  const combinedItems = Object.keys(planItemsMap).flatMap((parent) => {
    const planAmount = planItemsMap[parent].amount || 0;
    const actualAmount = actualItemsMap[parent]?.amount || 0;

    return [{
      planParent: parent,
      planAmount: planAmount,
      planPercentage: formatPercentage(planAmount / totalPlanIncome),
      actualParent: parent,
      actualAmount: actualAmount,
      actualPercentage: formatPercentage(actualAmount / totalActIncome)
    }];
  });

  // Add actual items that don't have a corresponding plan item
  Object.keys(actualItemsMap).forEach((parent) => {
    if (!planItemsMap[parent]) {
      const actualAmount = actualItemsMap[parent].amount;
      combinedItems.push({
        planParent: '',
        planAmount: 0,
        planPercentage: formatPercentage(0),
        actualParent: parent,
        actualAmount: actualAmount,
        actualPercentage: formatPercentage(actualAmount / totalActIncome)
      });
    }
  });

  // Add plan items that don't have a corresponding actual item
  Object.keys(planItemsMap).forEach((parent) => {
    if (!actualItemsMap[parent]) {
      const planAmount = planItemsMap[parent].amount;
      combinedItems.push({
        planParent: parent,
        planAmount: planAmount,
        planPercentage: formatPercentage(planAmount / totalPlanIncome),
        actualParent: '',
        actualAmount: 0,
        actualPercentage: formatPercentage(0)
      });
    }
  });

  return combinedItems;
};