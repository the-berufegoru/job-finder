<p align="center">
  <img src="./job-finder.png" width="300" />
</p>
<p align="center">
    <em><code>🔍 Job Recruitment & HR System RESTful API.</code></em>
</p>
<p align="center">
<img alt="GitHub NX Status" src="https://github.com/the-berufegoru/job-finder/actions/workflows/ci.yml/badge.svg">
<img alt="GitHub CodeQL Status" src="https://github.com/the-berufegoru/job-finder/actions/workflows/codeql.yml/badge.svg">
<img src="https://img.shields.io/github/license/the-berufegoru/job-finder?style=flat&color=0080ff" alt="license">
<img src="https://img.shields.io/github/last-commit/the-berufegoru/job-finder?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/the-berufegoru/job-finder?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/the-berufegoru/job-finder?style=flat&color=0080ff" alt="repo-language-count">

<p>
<p align="center">
  <em>Developed with the software and tools below.</em>
</p>
<p align="center">
 <img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style=flat&logo=esbuild&logoColor=black" alt="esbuild">
 <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
 <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
 <img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
 <img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
 <img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=flat&logo=Sequelize&logoColor=white" alt="Sequelize">
 <img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
 <img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&logo=Lodash&logoColor=white" alt="Lodash">
 <br>
 <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
 <img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
 <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
 <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
 <img src="https://img.shields.io/badge/Nx-143055.svg?style=flat&logo=Nx&logoColor=white" alt="Nx">
 <img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
 <img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

## 🔗 Quick Links

> - [📍 Overview](#-overview)
> - [📦 Features](#-features)
> - [📂 Repository Structure](#-repository-structure)
> - [🧩 Modules](#-modules)
> - [🚀 Getting Started](#-getting-started)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Running job-finder](#-running-job-finder)
>   - [🧪 Tests](#-tests)
> - [🛠 Project Roadmap](#-project-roadmap)
> - [🤝 Contributing](#-contributing)
> - [📄 License](#-license)
> - [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

<code>Our Job Recruitment & HR System API simplifies job recruitment and HR management.</code>

---

## 📦 Features

### Job Recruitment

- **Job Posting:** Easily create and manage job listings with detailed descriptions, requirements, and application instructions.
- **Candidate Tracking:** Monitor application statuses and manage candidates through every stage of the recruitment process.
- **Advanced Search:** Use powerful filters and search options to find the best candidates for your job openings.
- **Application Management:** Review applications, schedule interviews, and communicate with candidates directly through the platform.

### HR Management

- **Employee Records:** Maintain detailed records of employee information, including personal details, job roles, and employment history.
- **Payroll Management:** Handle payroll processing with features for salary calculations, deductions, and benefits management.
- **Performance Tracking:** Evaluate employee performance with integrated tools for reviews, feedback, and goal setting.

---

## 📂 Repository Structure

```sh
└── job-finder/
    ├── .github
    │   └── workflows
    │       ├── ci.yml
    │       └── codeql.yml
    ├── README.md
    ├── apps
    │   ├── job-finder
    │   │   ├── .eslintrc.json
    │   │   ├── Dockerfile
    │   │   ├── jest.config.ts
    │   │   ├── project.json
    │   │   ├── src
    │   │   │   ├── assets
    │   │   │   │   └── .gitkeep
    │   │   │   └── main.ts
    │   │   ├── tsconfig.app.json
    │   │   ├── tsconfig.json
    │   │   └── tsconfig.spec.json
    │   └── job-finder-e2e
    │       ├── .eslintrc.json
    │       ├── jest.config.ts
    │       ├── project.json
    │       ├── src
    │       │   ├── job-finder
    │       │   │   └── job-finder.spec.ts
    │       │   └── support
    │       │       ├── global-setup.ts
    │       │       ├── global-teardown.ts
    │       │       └── test-setup.ts
    │       ├── tsconfig.json
    │       └── tsconfig.spec.json
    ├── jest.config.ts
    ├── jest.preset.js
    ├── nx.json
    ├── package-lock.json
    ├── package.json
    ├── shared
    │   ├── .eslintrc.json
    │   ├── README.md
    │   ├── jest.config.ts
    │   ├── project.json
    │   ├── src
    │   │   ├── configs
    │   │   │   ├── dbConfig.ts
    │   │   │   ├── index.ts
    │   │   │   └── loggerConfig.ts
    │   │   ├── db
    │   │   │   ├── helpers
    │   │   │   │   ├── adminHelper.ts
    │   │   │   │   ├── applicationHelper.ts
    │   │   │   │   ├── candidateHelper.ts
    │   │   │   │   ├── deducationHelper.ts
    │   │   │   │   ├── employeeHelper.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── jobHelper.ts
    │   │   │   │   ├── payDetailHelper.ts
    │   │   │   │   ├── payslipHelper.ts
    │   │   │   │   ├── recruiterHelper.ts
    │   │   │   │   └── userHelper.ts
    │   │   │   └── models
    │   │   │       ├── adminModel.ts
    │   │   │       ├── applicationModel.ts
    │   │   │       ├── candidateModel.ts
    │   │   │       ├── deductionModel.ts
    │   │   │       ├── employeeModel.ts
    │   │   │       ├── index.ts
    │   │   │       ├── jobModel.ts
    │   │   │       ├── paydetailModel.ts
    │   │   │       ├── payslipModel.ts
    │   │   │       ├── recruiterModel.ts
    │   │   │       └── userModel.ts
    │   │   ├── index.ts
    │   │   ├── interfaces
    │   │   │   ├── adminInterface.ts
    │   │   │   ├── applicationInterface.ts
    │   │   │   ├── authInterface.ts
    │   │   │   ├── candidateInterface.ts
    │   │   │   ├── dbInterface.ts
    │   │   │   ├── employeeInterface.ts
    │   │   │   ├── erroInterface.ts
    │   │   │   ├── index.ts
    │   │   │   ├── jobInterface.ts
    │   │   │   ├── jwtInterface.ts
    │   │   │   ├── loggerInterface.ts
    │   │   │   ├── notificationInterface.ts
    │   │   │   ├── payslipInterface.ts
    │   │   │   ├── query
    │   │   │   │   ├── applicationQuery.ts
    │   │   │   │   ├── candidateQuery.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   ├── jobQuery.ts
    │   │   │   │   ├── recruiterQuery.ts
    │   │   │   │   └── userQuery.ts
    │   │   │   ├── recruiterInterface.ts
    │   │   │   └── userInterface.ts
    │   │   ├── libs
    │   │   │   ├── dbLib.ts
    │   │   │   └── index.ts
    │   │   ├── middlewares
    │   │   │   ├── appMiddleware.ts
    │   │   │   └── index.ts
    │   │   └── utils
    │   │       ├── index.ts
    │   │       ├── loggerUtil.ts
    │   │       └── serverUtil.ts
    │   ├── tsconfig.json
    │   ├── tsconfig.lib.json
    │   └── tsconfig.spec.json
    └── tsconfig.base.json
```

---

## 🧩 Modules

<details closed><summary>.</summary>

| File                                                                                              | Summary                         |
| ------------------------------------------------------------------------------------------------- | ------------------------------- |
| [nx.json](https://github.com/the-berufegoru/job-finder/blob/master/nx.json)                       | <code>► INSERT-TEXT-HERE</code> |
| [jest.config.ts](https://github.com/the-berufegoru/job-finder/blob/master/jest.config.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [package.json](https://github.com/the-berufegoru/job-finder/blob/master/package.json)             | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.base.json](https://github.com/the-berufegoru/job-finder/blob/master/tsconfig.base.json) | <code>► INSERT-TEXT-HERE</code> |
| [package-lock.json](https://github.com/the-berufegoru/job-finder/blob/master/package-lock.json)   | <code>► INSERT-TEXT-HERE</code> |
| [jest.preset.js](https://github.com/the-berufegoru/job-finder/blob/master/jest.preset.js)         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared</summary>

| File                                                                                                     | Summary                         |
| -------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [.eslintrc.json](https://github.com/the-berufegoru/job-finder/blob/master/shared/.eslintrc.json)         | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.lib.json](https://github.com/the-berufegoru/job-finder/blob/master/shared/tsconfig.lib.json)   | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.json](https://github.com/the-berufegoru/job-finder/blob/master/shared/tsconfig.json)           | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.spec.json](https://github.com/the-berufegoru/job-finder/blob/master/shared/tsconfig.spec.json) | <code>► INSERT-TEXT-HERE</code> |
| [jest.config.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/jest.config.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [project.json](https://github.com/the-berufegoru/job-finder/blob/master/shared/project.json)             | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src</summary>

| File                                                                                     | Summary                         |
| ---------------------------------------------------------------------------------------- | ------------------------------- |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/index.ts) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.configs</summary>

| File                                                                                                           | Summary                         |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [loggerConfig.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/configs/loggerConfig.ts) | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/configs/index.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [dbConfig.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/configs/dbConfig.ts)         | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.interfaces</summary>

| File                                                                                                                                | Summary                         |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [payslipInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/payslipInterface.ts)           | <code>► INSERT-TEXT-HERE</code> |
| [jwtInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/jwtInterface.ts)                   | <code>► INSERT-TEXT-HERE</code> |
| [applicationInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/applicationInterface.ts)   | <code>► INSERT-TEXT-HERE</code> |
| [erroInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/erroInterface.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [loggerInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/loggerInterface.ts)             | <code>► INSERT-TEXT-HERE</code> |
| [adminInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/adminInterface.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [userInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/userInterface.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [jobInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/jobInterface.ts)                   | <code>► INSERT-TEXT-HERE</code> |
| [dbInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/dbInterface.ts)                     | <code>► INSERT-TEXT-HERE</code> |
| [employeeInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/employeeInterface.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [candidateInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/candidateInterface.ts)       | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/index.ts)                                 | <code>► INSERT-TEXT-HERE</code> |
| [authInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/authInterface.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [notificationInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/notificationInterface.ts) | <code>► INSERT-TEXT-HERE</code> |
| [recruiterInterface.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/recruiterInterface.ts)       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.interfaces.query</summary>

| File                                                                                                                            | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [jobQuery.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/jobQuery.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [candidateQuery.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/candidateQuery.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [applicationQuery.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/applicationQuery.ts) | <code>► INSERT-TEXT-HERE</code> |
| [recruiterQuery.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/recruiterQuery.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [userQuery.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/userQuery.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/interfaces/query/index.ts)                       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.utils</summary>

| File                                                                                                     | Summary                         |
| -------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [serverUtil.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/utils/serverUtil.ts) | <code>► INSERT-TEXT-HERE</code> |
| [loggerUtil.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/utils/loggerUtil.ts) | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/utils/index.ts)           | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.libs</summary>

| File                                                                                          | Summary                         |
| --------------------------------------------------------------------------------------------- | ------------------------------- |
| [dbLib.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/libs/dbLib.ts) | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/libs/index.ts) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.db.helpers</summary>

| File                                                                                                                        | Summary                         |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [applicationHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/applicationHelper.ts) | <code>► INSERT-TEXT-HERE</code> |
| [employeeHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/employeeHelper.ts)       | <code>► INSERT-TEXT-HERE</code> |
| [adminHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/adminHelper.ts)             | <code>► INSERT-TEXT-HERE</code> |
| [candidateHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/candidateHelper.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [deducationHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/deducationHelper.ts)   | <code>► INSERT-TEXT-HERE</code> |
| [recruiterHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/recruiterHelper.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/index.ts)                         | <code>► INSERT-TEXT-HERE</code> |
| [payslipHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/payslipHelper.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [jobHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/jobHelper.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [payDetailHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/payDetailHelper.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [userHelper.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/helpers/userHelper.ts)               | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.db.models</summary>

| File                                                                                                                     | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [adminModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/adminModel.ts)             | <code>► INSERT-TEXT-HERE</code> |
| [deductionModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/deductionModel.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [userModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/userModel.ts)               | <code>► INSERT-TEXT-HERE</code> |
| [jobModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/jobModel.ts)                 | <code>► INSERT-TEXT-HERE</code> |
| [applicationModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/applicationModel.ts) | <code>► INSERT-TEXT-HERE</code> |
| [payslipModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/payslipModel.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [employeeModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/employeeModel.ts)       | <code>► INSERT-TEXT-HERE</code> |
| [paydetailModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/paydetailModel.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/index.ts)                       | <code>► INSERT-TEXT-HERE</code> |
| [recruiterModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/recruiterModel.ts)     | <code>► INSERT-TEXT-HERE</code> |
| [candidateModel.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/db/models/candidateModel.ts)     | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>shared.src.middlewares</summary>

| File                                                                                                                 | Summary                         |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [appMiddleware.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/middlewares/appMiddleware.ts) | <code>► INSERT-TEXT-HERE</code> |
| [index.ts](https://github.com/the-berufegoru/job-finder/blob/master/shared/src/middlewares/index.ts)                 | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                | Summary                         |
| --------------------------------------------------------------------------------------------------- | ------------------------------- |
| [ci.yml](https://github.com/the-berufegoru/job-finder/blob/master/.github/workflows/ci.yml)         | <code>► INSERT-TEXT-HERE</code> |
| [codeql.yml](https://github.com/the-berufegoru/job-finder/blob/master/.github/workflows/codeql.yml) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>apps.job-finder-e2e</summary>

| File                                                                                                                  | Summary                         |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [.eslintrc.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/.eslintrc.json)         | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/tsconfig.json)           | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.spec.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/tsconfig.spec.json) | <code>► INSERT-TEXT-HERE</code> |
| [jest.config.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/jest.config.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [project.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/project.json)             | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>apps.job-finder-e2e.src.support</summary>

| File                                                                                                                              | Summary                         |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [test-setup.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/src/support/test-setup.ts)           | <code>► INSERT-TEXT-HERE</code> |
| [global-teardown.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/src/support/global-teardown.ts) | <code>► INSERT-TEXT-HERE</code> |
| [global-setup.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/src/support/global-setup.ts)       | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>apps.job-finder-e2e.src.job-finder</summary>

| File                                                                                                                                 | Summary                         |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------- |
| [job-finder.spec.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder-e2e/src/job-finder/job-finder.spec.ts) | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>apps.job-finder</summary>

| File                                                                                                              | Summary                         |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [.eslintrc.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/.eslintrc.json)         | <code>► INSERT-TEXT-HERE</code> |
| [Dockerfile](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/Dockerfile)                 | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/tsconfig.json)           | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.app.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/tsconfig.app.json)   | <code>► INSERT-TEXT-HERE</code> |
| [tsconfig.spec.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/tsconfig.spec.json) | <code>► INSERT-TEXT-HERE</code> |
| [jest.config.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/jest.config.ts)         | <code>► INSERT-TEXT-HERE</code> |
| [project.json](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/project.json)             | <code>► INSERT-TEXT-HERE</code> |

</details>

<details closed><summary>apps.job-finder.src</summary>

| File                                                                                            | Summary                         |
| ----------------------------------------------------------------------------------------------- | ------------------------------- |
| [main.ts](https://github.com/the-berufegoru/job-finder/blob/master/apps/job-finder/src/main.ts) | <code>► INSERT-TEXT-HERE</code> |

</details>

---

## 🚀 Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `version x.y.z`

### ⚙️ Installation

1. Clone the job-finder repository:

```sh
git clone https://github.com/the-berufegoru/job-finder
```

2. Change to the project directory:

```sh
cd job-finder
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running job-finder

Use the following command to run job-finder:

```sh
npm run start:job-finder or npm run start:<projectName>
```

### 🧪 Tests

To execute tests, run:

```sh
npm test
```

---

## 🛠 Project Roadmap

- [x] `► Database Creation`
- [x] `► Authentiation and Authorization`
- [x] `► Admin Profile`
- [x] `► Canddate Profile`
- [x] `► Recruiter Profile`
- [ ] `► Job Posting`

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/the-berufegoru/job-finder/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/the-berufegoru/job-finder/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/the-berufegoru/job-finder/issues)**: Submit bugs found or log feature requests for Job-finder.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

   ```sh
   git clone https://github.com/the-berufegoru/job-finder
   ```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.

   ```sh
   git commit -m 'Implemented new feature x.'
   ```

6. **Push to GitHub**: Push the changes to your forked repository.

   ```sh
   git push origin new-feature-x
   ```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [MIT](LICENSE.md) License. For more details, refer to the [LICENSE](https://github.com/the-berufegoru/job-finder?tab=MIT-1-ov-file#readme/) file.

---

## 👏 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
