// *********************** Data Processing Helper Functions ************************ //

// 1. fetchServerData(URL)

//    fetch json data from the AWS server and return two separate objects
//     for category and main entree data

// 2. buildCateogryToMainsHash

//   built a hashing data structure maps category id to an array of associated main entrees
//   this data structure is specifically to speed up the loading of individual category pages
//   this helper function also creates a new object that stores a subset of the entree data
//   provided by server
//   this app currently only needs price, description and name, so the other stuff does not
//   need to be imported

// 3. filterOutEmptyCategories

//   many of the categories returned from the server do not have any associated entrees,
//   so fitler them out


// ******************************************************************************** //

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

  fetchServerData: async (URL) => {
    function _validateResponse(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
    function _readJSON(response) { return response.json(); }
    function _pullOutRelevantData(jsonData) {
      return [jsonData.digestData.categories, jsonData.digestData.mains];
    }

    return fetch(URL)
    .then(_validateResponse)
    .then(_readJSON)
    .then(_pullOutRelevantData);
  },
};

// ******************************************************************************************* //

//                             MAIN DATA FETCHING & PROCESSING FUNCTION

// ******************************************************************************************* //

const fetchAndProcessServerData = async () => {
  const [fetchedCategoryData, fetchedMainsData] = await helperFNs.fetchServerData(helperFNs.dataURL);
  const [categoryToMainsHash = {}, mainItemDetails = {}] = await helperFNs.buildCategoryToMainsHash(fetchedMainsData);
  const categoryDetails = helperFNs.filterOutEmptyCategories(fetchedCategoryData, categoryToMainsHash)
  return {
    categoryDetails,
    mainItemDetails,
    categoryToMainsHash,
  };
}

export default fetchAndProcessServerData;
