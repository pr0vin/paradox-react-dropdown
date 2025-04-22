# paradox-react-dropdown

A customizable, searchable dropdown (select) component for React. Perfect for searchable forms, filters, or any interface that requires enhanced select inputs.

---

## Features

- 🔍 Search through options with customizable fields
- 🔄 Dynamic option filtering
- 💬 Multi-field display per option
- 🎯 Lightweight and reusable
- 🪄 Fully customizable placeholder and styles

---

##  Installation

### From npm

```bash
npm install paradox-react-dropdown

###Usage
import React, { useState } from "react";
import SelectSearch from "paradox-react-dropdown";

const options = [
  { id: 1, title: "Frontend Developer", location: "Remote" },
  { id: 2, title: "Backend Developer", location: "On-site" },
  { id: 3, title: "Fullstack Developer", location: "Hybrid" },
];

const App = () => {
  const [selectedId, setSelectedId] = useState("");

  return (
    <div className="w-80">
      <SelectSearch
        options={options}
        value={selectedId}
        onChange={setSelectedId}
        placeholder="Select a role"
        searchFields={["title", "location"]}
        displayFields={["title", "location"]}
      />
    </div>
  );
};

export default App;

