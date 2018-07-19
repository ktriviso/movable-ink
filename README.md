# Weather APP
## Built by Krista Triviso

## Project Description

The following application was built for the sole purpose of meeting the requirements for Movable Ink's Application Process.

![Final Version](https://github.com/ktriviso/movable-ink)

## Developer Instructions

- Download Github repository ![Here](https://github.com/ktriviso/movable-ink).
- From root, run npm i then npm start
- Open localhost:3000

## Technical Requirements

Front End:
- Create an HTML file matching the attached image that is reactive to the query string at the end of the URL. The query strings are 'zip_code' and 'date’. For example, if the file is index.html, it should be reactive to: index.html?zip_code=10011&date=04/10/2017

- Use API data to create a page with the attached creative spec
- The 'zip_code' param should be use as part of the API request
- The 'date' param should be use to extract the corresponding forecasts from the API response (assume the merged in "date" will be within the next ten days)
- Use Helvetica for all fonts instead of what is in the image
- Link to the icons used in the creative is above
- If the page must error out, it should appear as a blank page (completely blank)
- You may use jQuery

## Additional Add-ons
- Users location is dynamically added using the react-geolocation package
- Interface is fully mobile and responsive
- Dates, icons and description are not hard coded, they are being retrieved solely from the API


## Technologies and Additional Libraries / Tools

| Name             | Description                                             |
| ---------------- | ------------------------------------------------------- |
| React            | Modular JavaScript library for building user interfaces |
| wunderground API | 3rd party api that allows access to weather information |
| geolocation      | Declarative geolocation dependency in React             |

## Issues and Resolutions

DEVELOPER NOTE: If any unforeseen error occurs with the fetch calls, the application will render a blank component using the history.push() associated with react-router-dom

ERROR: The Weather Underground API is slow so there is a lag in the UI until it loads.
RESOLUTION: Not resolved, This would not be an ideal 3rd Party API for production

ERROR: A few times The Weather Underground API would not load the geolocation. No errors being logged so debugging was troublesome.
RESOLUTION: Created a default location in case the API fails to load the user information. See line 80 in App.js

ERROR: The wunderground API coordinates are not very accurate in regards to pinpointing the city
RESOLUTION: Not resolved, This would not be an ideal 3rd Party API for production
