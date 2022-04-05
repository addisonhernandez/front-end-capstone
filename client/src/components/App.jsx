import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Overview from './Overview/Overview';
import RelatedItems from './RelatedItems/RelatedItems';
import QuestionAnswers from './QuestionAnswers/QuestionAnswers';
import RatingReviews from './RatingReviews/RatingReviews';
import ProductContext from './Context';

function App() {
  const [productId, setProductId] = useState(38321);
  const [productInfo, setProductInfo] = useState({});
  const [combinedAPIDetails, setCombinedAPIDetails] = useState([]);
  const [yourOutfit, setYourOutfit] = useState([]);

  const memoizedState = useMemo(
    () => ({
      productId,
      setProductId,
      productInfo,
      setProductInfo,
      combinedAPIDetails,
      setCombinedAPIDetails,
      yourOutfit,
      setYourOutfit,
    }),
    [productId, productInfo],
  );

  // update the context store when a new product is selected
  useEffect(() => {
    axios
      .get(`/products/${productId}`)
      .then((results) => setProductInfo(results.data))
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [productId]);

  return (
    <div className="app">
      <h1>Team Alpine Rockies!</h1>
      <ProductContext.Provider value={memoizedState}>
        <Overview />
        <RelatedItems />
        <QuestionAnswers />
        <RatingReviews />
      </ProductContext.Provider>
    </div>
  );
}

export default App;
