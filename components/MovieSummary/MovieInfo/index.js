import * as React from 'react';
import InfoWrapper from 'parts/InfoWrapper';
import Header from 'parts/Header';
import BasicsSection from './BasicsSection';
import Button from 'components/UI/Button';
import LoadingSpinner from 'components/UI/LoadingSpinner';
import TheGenresSection from './TheGenresSection';
import TheSynopsisSection from './TheSynopsisSection';
import TheCastSection from './TheCastSection';
import MovieAdSection from './MovieAdSection';
import SIZE_TYPES from 'utils/constants/size-types';
import withTheme from 'utils/hocs/withTheme';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Refresh from '@mui/icons-material/Refresh';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextSection from 'parts/TextSection';
import { rateMovie, deleteRateMovie } from 'actions';

const MovieInfo = ({
  theme,
  baseUrl,
  movie
}) => {
  const [value, setValue] = React.useState(null);
  const [loadingRate, setLoadingRate] = React.useState(false);
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleSubmitRate = () => {
    rateMovie(movie.id, value).apply();
    setLoadingRate(true);
    setTimeout(
      () => {
        setLoadingRate(false);
        setMessage("Thanks for your rate");
        setOpen(true);
      },
      3000
    );
  }
  const handleSubmitDeleteRate = () => {
    deleteRateMovie(movie.id).apply();
    setLoadingDelete(true);
    setTimeout(
      () => {
        setLoadingDelete(false)
        setMessage("You have unrated this film successfully");
        setOpen(true);
      },
      3000
    );
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <InfoWrapper>
        <Header
          size={SIZE_TYPES.LARGE}
          title={movie.title}
          subtitle={movie.tagline} />
        <BasicsSection
          className='basic-section-bottom-margin'
          voteAverage={movie.vote_average}
          spokenLanguages={movie.spoken_languages}
          runtime={movie.runtime}
          releaseDate={movie.release_date} />
        <TheGenresSection
          className='the-genres-section-bottom-margin'
          genres={movie.genres} />
        <TheSynopsisSection
          className='the-synopsis-section-bottom-margin'
          synopsis={movie.overview || 'There is no synopsis available...'} />
        <TheCastSection
          className='cast-section-bottom-margin'
          cast={movie.cast}
          baseUrl={baseUrl} />
        <TextSection
          className='the-synopsis-section-bottom-margin'
          heading='Rate the Movie' />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 5
          }}
        >
          <Rating
            name="size-large"
            size="large"
            value={value}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Box sx={{ ml: 2 }} >
            {loadingRate ? <LoadingSpinner /> : <Button
              endIcon={
                <StarIcon fontSize='large' />
              }
              title='Rate'
              disabled={value ? false : true}
              onClick={handleSubmitRate}
            />}
          </Box>
          <Box sx={{ ml: 2 }}>
            {loadingDelete ? <LoadingSpinner /> : <Button
              endIcon={
                <Refresh fontSize='large' />
              }
              title='Undo Rate'
              onClick={handleSubmitDeleteRate}
            />}
          </Box>
        </Box>
        <MovieAdSection
          websiteUrl={movie.homepage}
          imdbId={movie.imdb_id}
          videos={movie.videos.results} />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
          action={action}
        />
      </InfoWrapper>
      <style jsx>{`
      :global(.basic-section-bottom-margin) {
        margin-bottom: 5rem;
      }

      :global(.the-genres-section-bottom-margin) {
        margin-bottom: 3rem;
      }

      :global(.the-synopsis-section-bottom-margin) {
        margin-bottom: 3rem;
      }

      :global(.cast-section-bottom-margin) {
        margin-bottom: 5rem;
      }

      @media ${theme.mediaQueries.smaller} {
        :global(.basic-section-bottom-margin) {
          margin-bottom: 3rem;
        }
      }
    `}</style>
    </>
  )
};

export default withTheme(MovieInfo);
