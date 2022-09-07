import Router from 'next/router';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

const deleteRateMovie = (movieId) => async () => {
  try {
    const response = await tmdbAPI.delete(`/${TMDB_API_VERSION}/movie/${movieId}/rating`).then(function (response) {
      if (response.status) {
        console.log(response.status);
        return response.status;
      } else {
        console.log(response);
        return response;
      }
    })
      .catch(function (error) {
        console.log(error);
        return response;
      });
  } catch (error) {
    console.log('[rateMovie] error => ', error);
    Router.push(LINKS.ERROR.HREF);
  }
};

export default deleteRateMovie;
