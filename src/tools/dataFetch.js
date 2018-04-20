const URL = "https://s3.amazonaws.com/staginggooduncledigests/products_istcki0x000h28d97a9rv9jp.json";

// need to fetch the data from good uncle's aws server

/*
steps:
1. extract out categories into a map where key is category id and value is category name
2. extract out the mains into a map where  key is id and value is another map with category id, name, name abbreviated, price, and description
  - price is found as mains.productOptions.0.price in cents
3. create the processed map: { categoryID: [mainID1, mainID2, ...]}
4. optionally clear out any categories from categories map if it's not in use
5. store the 3 maps into the redux store
*/

const processData = new Promise((resolve, reject) => {
  const validateResponse = (response) => {
    if (!response.ok) {
      reject(Error(response.statusText));
    }
    return response;
  };

  const readResponse = response => response.json();


  // filter out empty categories
  // filter out items with missing crucial data e.g. price
  const processJSON = (json) => {
    let rawCategoryData = json.digestData.categories; // array of categories
    const rawMainsData = json.digestData.mains;
    const filteredCategoryContents = {}; // { cat1id: [] }
    const filteredMainItemDetails = {};
    // { mains1id: {name: 'chick fingers', price: 1299, description: 'yum'}}

    // sift through all mainsData
    Object.entries(rawMainsData).forEach(
      ([, itemData]) => {
        const categoryID = itemData.categories[0];
        const metaItemData = {
          name: (itemData.name || itemData.nameAbbreviated || ''),
          price: itemData.productOptions[0].price,
          description: itemData.description,
        };
        if (itemData.active && itemData.id && metaItemData.name && metaItemData.price) {
          // only add an item that is active, has a name, price and id
          if (!(categoryID in filteredCategoryContents)) {
            filteredCategoryContents[categoryID] = [];
          }
          filteredCategoryContents[categoryID].push(itemData.id);
          filteredMainItemDetails[itemData.id] = metaItemData;
        }
      },
    ); // finished sifting

    // filter out rawCategoryData for any items that don't have mains
    rawCategoryData = rawCategoryData.filter(
      categoryData => (categoryData.id in filteredCategoryContents),
    );
    // build the category item list
    resolve({
      rawCategoryData,
      categoryContents: filteredCategoryContents,
      mainItemDetails: filteredMainItemDetails,
    });
  };

  fetch(URL)
    .then(validateResponse)
    .then(readResponse)
    .then(processJSON)
    .catch((error) => {
      console.log("Problem fetching Uncle Good Data: ", error);
      reject(error);
    });
});

// not using this function, but it visually shows what the store looks like
const createMockReduxStoreData = () => ({
  user: {
    authToken: '',
    phone: '',
    cart: {
      items: {
        // id: quantity
        1: 2,
      },
      totalCost: 0,
      totalItems: 0,
    },
  },
  foodStore: {
    lastRefreshDate: '',
    rawCategoryData: {
      0: {
        id: 101,
        name: 'Sandwiches',
      },
    },
    categoryContents: {
      101: [1],
    },
    mainItemDetails: {
      // id: {name, price, description}
      1: { name: 'Chicken Fingers', price: 1299, description: 'battered diabetes sauted with diahrea' },
    },
  },
});

export default { processData, createMockReduxStoreData };

