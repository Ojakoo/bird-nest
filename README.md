# Birds Nest

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## App description

### `Data`

Drone positions
**GET assignments.reaktor.com/birdnest/drones**

The monitoring equipment endpoint above provides a snapshot of all the drones within a 500 by 500 meter square and is updated about once every 2 seconds. The equipment is set up right next to the nest.

This snapshot is in XML format and contains, among other things, the position and serial number of each drone in the area.

The position of the drones are reported as X and Y coordinates, both floating point numbers between 0-500000
The no-fly zone is a circle with a 100 meter radius, origin at position 250000,250000
Pilot information
**GET assignments.reaktor.com/birdnest/pilots/:serialNumber**

The national drone registry endpoint above will provide you the name, contact information and other details for a drone's registered owner in JSON format, based on the given serial number. Please note on a rare occasion pilot information may not be found, indicated by a 404 status code.

In order to protect the privacy of well behaved pilots keeping appropriate distance, you may only query this information for the drones violating the NDZ.

### `Objective`

Build and deploy a web application which lists all the pilots who recently violated the NDZ perimeter.

What it looks like is up to you, but this list should

Persist the pilot information for 10 minutes since their drone was last seen by the equipment
Display the closest confirmed distance to the nest
Contain the pilot name, email address and phone number
Immediately show the information from the last 10 minutes to anyone opening the application
Not require the user to manually refresh the view to see up-to-date information
Develop the application as if it was always operational. However, for the sake of staying within free tiers of some hosting providers, it's OK if your application is suspended and loses data after it has not received traffic for a while. It'll be given a moment to warm up and gather new data before being evaluated.

Tip: You may find it helpful to also visualize the drone positions in some way, but doing so is not a requirement.

### `About the data and simulation`

For simplicity, this world is two-dimensional, so don't worry about the altitude of the drones.
For the sake of making development and testing easier, there should always be a few drones in the zone and someone should be violating the no-fly perimeter frequently.
Each pilot will only fly a single drone and their contact information will not change
Missing some potential violations at the edge of the perimeter is fine, it's enough to report only the violations explicitly visible in the snapshots, not violations that may have happened between snapshots.

### `Evaluation and priorities`

The two most important factors we use to evaluate your solution are

The quality of your code, such as readability, structure and correctness
How well you understood and matched the objectives in this brief
Keep in mind how good the UI looks is secondary in the evaluation of this assignment and only producing the list is required. Focus on solving the objectives first, as bending or omitting some of the objectives may trivialize the challenges we are interested to see you solve.

The choice of technology is up to you and you are free to use any libraries you see fit, but the application must be usable with common modern web browsers.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
