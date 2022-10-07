import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Card,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const AcceptItem = ({ item, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <ListItem>
      <Card raised sx={{ maxHeight: expanded ? null : 150, width: 1 }}>
        <Box
          sx={{
            display: "flex",
            flex: "1",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={item.image}
            sx={{ height: 150, width: 150 }}
          />
          <CardContent sx={{ flex: "1" }}>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.subName}
            </Typography>
          </CardContent>
          <IconButton onClick={handleExpandClick} sx={{ px: 2 }}>
            <ExpandMoreIcon
              sx={{
                transform: expanded ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
              }}
            />
          </IconButton>
          {children}
        </Box>
        <Collapse in={expanded} timeout={1000} unmountOnExit>
          <CardContent sx={{ display: "flex" }}>
            <List sx={{ flexBasis: "30%" }}>
              <Typography paragraph>Ingredients:</Typography>
              {item.ingredients?.map((ingredient) => (
                <ListItem>{ingredient}</ListItem>
              ))}
            </List>
            <List sx={{ flexBasis: "70%" }}>
              <Typography paragraph>Method:</Typography>
              {item.instructions?.map((instruction) => {
                return <ListItem>{instruction}</ListItem>;
              })}
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </ListItem>
  );
};

export default AcceptItem;
