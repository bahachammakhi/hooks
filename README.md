# React custom Hooks

![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fbahachammakhi) ![GitHub followers](https://img.shields.io/github/followers/bahachammakhi?style=social)

> Custom hooks 🧑‍💻

## Links

- [PersonalWebsite](https://www.bahachammakhi.tn) My personal website

- [@bahachammakhi/hooks](https://www.npmjs.com/package/@bahachammakhi/hooks) NPM package for this library

## Technologies

- [Typescript](https://www.typescriptlang.org/) TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. 💻
- [React](https://reactjs.org/) A JavaScript library for building user interfaces. 💻

## Setup

```bash
$npm install @bahachammakhi/hooks
#
$yarn add @bahachammakhi/hooks
```

## Features

List of features ready and TODOs for future development

- useApi hook

To-do list:

- useForm hook (documentation /exemple)
- useCurrentWidth (documentation / exemple)
- useLifeCycle (documentation / exemple)

## Status

Project is: _in progress_

# Documentation

## useApi

```jsx
import React, { useState, useEffect } from "react";
import { useApi } from "@bahachammakhi/hooks";
import axios from "axios";
const getPeople = () => axios.get("https://swapi.dev/api/people/");
const App = () => {
  const { ...calls } = useApi({ getPeople });
  const [people, setPeople] = useState < any > [];

  useEffect(() => {
    calls.getPeople.call();
  }, []);
  useEffect(() => {
    setPeople(calls.getPeople.data);
  }, [calls.getPeople.success]);

  return (
    <>
      {people.results.map((element: any) => {
        return <>{element.name}</>;
      })}
    </div>
  );
};
```

## useCurrentWidth

```jsx
import React from "react";
import { useCurrentWidth } from "@bahachammakhi/hooks";

const App = () => {
  const width = useCurrentWidth();

  return (
    <div>
      <div style={{ width: width, backgroundColor: "black" }}>Name</div>
    </div>
  );
};
```

## Contact

Created by [@bahachammakhi](https://www.bahachammakhi.tn/) - feel free to contact me!
