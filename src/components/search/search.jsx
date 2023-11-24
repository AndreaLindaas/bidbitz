import { TextField, Button } from "@mui/material";

export default function Search() {
  return (
    <>
      <form>
        <TextField
          name="search"
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
        <Button variant="contained" className="secondary">
          Search
        </Button>
      </form>
    </>
  );
}
