import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { TextField, Button as MUIButton } from '@mui/material'; // Axtarış və Sort düyməsi üçün komponent

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: 'rotate(0deg)',
  '&.expanded': {
    transform: 'rotate(180deg)',
  },
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const [books, setBooks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSorted, setIsSorted] = React.useState(false); // Sort state əlavə et

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  React.useEffect(() => {
    axios.get('http://localhost:3000/books') 
      .then(response => {
        setBooks(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const sortedBooks = isSorted
    ? filteredBooks.sort((a, b) => a.title.localeCompare(b.title)) 
    : filteredBooks;

  if (books.length === 0) return <div>Loading...</div>;

  const handleSort = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div>
      
      <TextField
        label="Search Books"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginTop: '20px' }}
      />

      
      <MUIButton variant="contained" onClick={handleSort} style={{ marginTop: '10px' }}>
        {isSorted ? 'Unsort' : 'A-Z'}
      </MUIButton>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '60px' }}>
        {sortedBooks.length === 0 ? (
          <Typography variant="h6">No books found</Typography>
        ) : (
          sortedBooks.map((book) => (
            <Card sx={{ maxWidth: 345 }} key={book.id}>
              <CardMedia
                component="img"
                height="194"
                image={book.image}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <NavLink to={`/Favorites`}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </NavLink>
                <NavLink to={`/Basket`}>
                  <IconButton aria-label="add to cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </NavLink>

                <Button variant="contained" disableElevation>
                  <NavLink
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/books/${book.id}`}
                  >
                    Detail
                  </NavLink>
                </Button>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
