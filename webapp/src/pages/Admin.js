import React, { useState, useEffect } from "react";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ProblemListItem from "../components/ProblemListItem/ProblemListItem";
import axios from "axios";

function Admin() {
  //We set this state from getting data from the API
  const [itemsToAdd, setItemsToAdd] = useState([]);
  //We set this state when one of the items in the list changes (removing from DB)
  const [itemsToRemove, setItemsToRemove] = useState([]);

  //We need to do two API calls, one with our backend, and one with the leetcode api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://alfa-leetcode-api.onrender.com/problems"
        );
        setItemsToAdd(response.data.problemsetQuestionList);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDbData = async () => {
      try {
        const response = await axios.get(
          "https://codecrew-leetcode-api.onrender.com/api/problems"
        );
        setItemsToRemove(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchDbData();
  }, []);

  console.log("itemsToAdd:", itemsToAdd);

  const handleAddItem = (item) => {
    // setItemsToAdd([...itemsToAdd, item]);
    
  };

  const handleRemoveItem = (item) => {};
  return (
    <div>
      <Grid container spacing={2}>
        <AdminPanel id="addProblem">
          <List>
            {itemsToAdd.map((item) => (
              <div>
                <IconButton aria-label="delete">
                  <AddCircleIcon />
                </IconButton>
                <ProblemListItem
                  key={item.questionFrontendId}
                  title={item.title}
                />
              </div>
            ))}
          </List>
        </AdminPanel>
        <AdminPanel id="removeProblem">
          {
            <div>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                {
                  itemsToRemove.map((item) => (
                    <ProblemListItem title={item.title}/>
                ))}
                
                
            </div>
            

          }

          
        </AdminPanel>
      </Grid>
    </div>
  );
}

export default Admin;
