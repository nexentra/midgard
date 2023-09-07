<br/>
<p align="center">
  <a href="https://github.com/nexentra/genesis-dashboard">
    <img src="https://imageupload.io/ib/GdQnN0T1ZYR8pmO_1694071655.png" alt="Genesis" width="300" height="300">
  </a>

  <h3 align="center">Genesis-Dashboard</h3>

  <p align="center">
    Make your site dynamic in few clicks!!
    <br/>
    <br/>
  </p>
</p>

![Contributors](https://img.shields.io/github/contributors/nexentra/genesis-dashboard?color=dark-green) ![License](https://img.shields.io/github/license/nexentra/genesis-dashboard) 

## About The Project

Genesis-Dashboard - With this powerful tool, users can create their own tables and easily add data to them. The tables are securely saved in the backend, ensuring data integrity and flexibility. What's more, these tables are exposed through public endpoints, enabling seamless integration with other websites and applications

Key Features:

1) User-friendly Interface: Genesis-Dashboard offers a simple and intuitive interface for easy table management.

2) Easy to Deploy: Genesis-Dashboard is easy to deploy as the frontend is embedded with the backend and containerized with Docker.
    
3) Data Integrity: We ensure data integrity by storing tables in a secure backend.
    
4) Public Endpoints: Tables are exposed through public endpoints, enabling seamless integration with other websites and applications.
    
5) Easy to Use: Genesis-Dashboard is easy to use.

6) JWT secured user accounts.

7) Fast: Genesis-Dashboard is fast as it is built with latest technologies such as Go, React, Postgresql, RoseDB.

## Built With

* `Backend:` Go + Labstack Echo
* `Frontend:` React + Tailwind
* `Containerization and deployment:` Docker + Fly.io
* `Caching:` RoseDB

## Usage

First go to [https://dashboard.genesis.nexentra.online](https://dashboard.genesis.nexentra.online/auth) and [create your account](https://dashboard.genesis.nexentra.online/auth/login). Then go to the [Tables page](https://dashboard.genesis.nexentra.online/admin/tables). You can create a new table by clicking on the `Create A Table` button. You can also delete a table by clicking on the `Delete` button. You can add data to a table by clicking on the `Add Data` button. You can also edit or delete data by clicking on the `Edit` or `Delete` button respectively. Then come back to the homepage and make get request to the given endpoints to get the data.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Taskfile
* Nodejs v16.20.2
* Go v1.18 or higher

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:nexentra/genesis-dashboard.git
    ```
2. Create a `.env` file in the root directory and add the environment variables from the `.env.example` file with your own values. Make sure to set PRODUCTION to false in development.

3. Run the following command to start the server:
    ```sh
    task run
    ```
4. Go to [http://localhost:3000](http://localhost:3000) to access the frontend. and [http://localhost:8080](http://localhost:8080) to access the backend.

### Note

You can find more commands in the taskfile. The taskfile should be self explanatory. In devmode the frontend and backend will run seperately and in production mode the frontend will be embedded with the backend. So in production mode you can access the frontend from the backend port (:8080). And in devmode you can access the frontend from the :3000 port.

## License

Distributed under the GPL-3 License. See [LICENSE](https://github.com/nexentra/genesis-dashboard/blob/main/LICENSE.md) for more information.

## Authors

* **Towhid Khan** - *I am a Software Developer.I enjoy using my skills to contribute to the exciting technological advances that happen every day.* - [Towhid Khan](https://github.com/KnockOutEZ) - *Main Developer Behind this project*

## Acknowledgements

* [Echo](https://github.com/labstack/echo)
* [RoseDB](https://github.com/rosedblabs/rosedb)
* [Tailwind Starter Kit](https://github.com/creativetimofficial/tailwind-starter-kit)
