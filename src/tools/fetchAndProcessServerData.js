const helperFNs = {
  dataURL: "https://s3.amazonaws.com/staginggooduncledigests/products_istcki0x000h28d97a9rv9jp.json",
  buildCategoryToMainsHash: (fetchedMainsData) => {
    const categoryToMainsHash = {};
    const mainItemDetails = {};
    Object.entries(fetchedMainsData).forEach(
      ([, itemData]) => {
        const basicMenuData = {
          name: (itemData.name || itemData.nameAbbreviated || ''),
          price: itemData.productOptions[0].price,
          description: itemData.description,
        };
        const categoryID = itemData.categories[0];
        if (itemData.active && itemData.id && basicMenuData.name && basicMenuData.price) {
          // only add an item that is active, has a name, price and id
          if (!(categoryID in categoryToMainsHash)) {
            categoryToMainsHash[categoryID] = [];
          }
          categoryToMainsHash[categoryID].push(itemData.id);
          mainItemDetails[itemData.id] = basicMenuData;
        }
      },
    );
    return [categoryToMainsHash, mainItemDetails];
  },
  // filter out rawCategoryData for any items that don't have mains
  filterOutEmptyCategories: (fetchedCategoryData, categoryToMainsHash) =>
    fetchedCategoryData.filter(
      categoryData => (categoryData.id in categoryToMainsHash),
    ),

  fetchServerData: (URL) => {
    function validateResponse(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    function readJSON(response) { return response.json(); }
    function pullOutRelevantData(jsonData) {
      return [jsonData.digestData.categories, jsonData.digestData.mains];
    }
    return fetch(URL)
      .then(validateResponse)
      .then(readJSON)
      .then(pullOutRelevantData);
  },
};

const fetchAndProcessServerData = new Promise((resolve, reject) => {
  helperFNs.fetchServerData(helperFNs.dataURL)
    .then(([fetchedCategoryData, fetchedMainsData]) => {
      const [categoryToMainsHash = {}, mainItemDetails = {}] =
        helperFNs.buildCategoryToMainsHash(fetchedMainsData);
      const categoryDetails =
        helperFNs.filterOutEmptyCategories(fetchedCategoryData, categoryToMainsHash);
      resolve({
        categoryDetails,
        mainItemDetails,
        categoryToMainsHash,
      });
    })
    .catch((error) => {
      console.log('Unable to fetch data from the server: ', error);
      reject(error);
    });
});

export default fetchAndProcessServerData;

/*
// not using this function, but it visually shows what the store looks like
const createMockReduxStoreData = () => ({
  user: {
    authToken: '',
    phone: '',
    cartLastUpdated: '', // used to trigger updates to the cart widget
    cart: {
      1: 3, // itemId: quantity
    },
  },
  foodStore: {
    refreshTracking: { lastRefreshDate: '', refreshInProgress: false },
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
      1: { name: 'Chicken Fingers', price: 1299,
        description: 'battered diabetes sauted with diahrea' },
    },
  },
});
*/

