import { css } from "@linaria/core";

css`
  :global() {
    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
    html,
    body {
      font-family: Poppins, -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif !important;
    }

    body {
      padding: 0;
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .pastel-icon {
      vertical-align: -0.125em;
      text-align: center;
      text-transform: none;
    }

    :root {
      --primary-1: #bdbada;
      --primary-2: #9f9ad6;
      --primary-3: #7970d4;
      --primary-4: #5448c8;
      --primary-5: #3a2eaf;
      --primary-6: #1d0998;
      --primary-7: #210271;

      --danger-1: #ffcece;
      --danger-2: #ff9595;
      --danger-3: #ff5b5b;
      --danger-4: #e40000;
      --danger-5: #be0000;
      --danger-6: #a80202;
      --danger-7: #8c0000;

      --info-1: #e2eefc;
      --info-2: #b8d5f7;
      --info-3: #87b9f3;
      --info-4: #4f98ee;
      --info-5: #1f7ce8;
      --info-6: #1469cc;
      --info-7: #0f509b;

      --gray-1: #fafafa;
      --gray-2: #f2f2f2;
      --gray-3: #dfdfdf;
      --gray-4: #9f9f9f;
      --gray-5: #909090;
      --gray-6: #767676;
      --gray-7: #3d3d3d;

      --pure-white: #fff;
      --button-background: #fafafa;
      --icon-button-hover: #eaeaea;
      --neutral-black: #23272a;
      --text-default: #3d3d3d;
      --button-disabled: rgba(159, 159, 159, 0.85);
      --text-disabled: #eee;
    }
  }
`;
