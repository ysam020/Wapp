import React, { useContext } from "react";
import "../styles/communities.css";
import { ToggleSidebarContext, CommunitiesContext } from "../contexts/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ButtonPrimary from "./ButtonPrimary";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
  })
);

function Communities() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const communitiesContext = useContext(CommunitiesContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              communitiesContext.communitiesDispatch("toggle");
              toggleSidebarContext.toggleSidebarDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Communities</h3>
        </div>
      </div>

      <div className="communities-body">
        <span
          data-testid="community-tab-nux"
          data-icon="community-tab-nux"
          className=""
        >
          <svg
            viewBox="0 0 214 129"
            height="129"
            width="214"
            preserveAspectRatio="xMidYMid meet"
            className=""
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M153.238 17.6142C174.898 24.2905 195.316 41.8699 193.825 72.8203C191.561 119.845 147.29 132.807 119.086 119.812C80.825 102.184 75.9581 99.2518 48.9529 100.053C28.8388 100.651 8.06758 91.4389 4.71949 64.9657C2.29269 45.7769 14.9317 26.8101 36.6246 19.3617C86.4308 2.26065 131.579 10.9378 153.238 17.6142Z"
              fill="#DAF7F3"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M56.8017 27.0502C58.6433 20.9207 63.217 15.0878 65.7923 13.4955C65.28 14.9656 64.6112 16.7972 63.8633 18.7525C70.1866 15.7125 80.8609 15.3429 98.6062 14.7284C143.139 13.1862 143.139 13.1862 144.681 57.7193C145.2 72.6977 145.544 82.6382 144.078 89.294C145.964 87.3411 147.853 85.4323 149.377 83.8929L149.377 83.8927L149.597 83.6711C149.8 83.4658 149.996 83.2677 150.184 83.0776C149.765 86.9239 144.708 94.964 138.356 98.6726C132.361 102.732 121.378 103.113 101.691 103.794C57.1575 105.337 57.1575 105.337 55.6153 60.8036C55.0367 44.0941 54.6751 33.6543 56.8017 27.0502Z"
              fill="#68DE8E"
            ></path>
            <path
              d="M65.7923 13.4955L66.4533 13.7258L67.1026 11.8624L65.4241 12.9001L65.7923 13.4955ZM56.8017 27.0502L57.4682 27.2648L57.4721 27.2516L56.8017 27.0502ZM63.8633 18.7525L63.2095 18.5025L62.5811 20.1457L64.1667 19.3834L63.8633 18.7525ZM144.078 89.294L143.395 89.1434L142.862 91.5618L144.582 89.7802L144.078 89.294ZM149.377 83.8929L148.904 83.3775L148.891 83.3887L148.88 83.4004L149.377 83.8929ZM149.377 83.8927L149.851 84.4081L149.863 84.3969L149.875 84.3852L149.377 83.8927ZM149.597 83.6711L150.094 84.1636L150.094 84.1636L149.597 83.6711ZM150.184 83.0776L150.88 83.1534L151.097 81.1584L149.686 82.5854L150.184 83.0776ZM138.356 98.6726L138.003 98.0681L137.983 98.0799L137.964 98.093L138.356 98.6726ZM65.4241 12.9001C64.0163 13.7706 62.1636 15.7184 60.4483 18.1701C58.7208 20.6393 57.0784 23.6967 56.1313 26.8488L57.4721 27.2516C58.3667 24.2741 59.9319 21.3504 61.5954 18.9727C63.2712 16.5774 64.993 14.8127 66.1604 14.0909L65.4241 12.9001ZM64.5172 19.0026C65.2672 17.0416 65.9384 15.2034 66.4533 13.7258L65.1312 13.2652C64.6216 14.7279 63.9552 16.5528 63.2095 18.5025L64.5172 19.0026ZM98.582 14.0288C89.7176 14.3358 82.5877 14.5824 76.8841 15.1341C71.1886 15.6851 66.8372 16.5461 63.56 18.1217L64.1667 19.3834C67.2127 17.919 71.3601 17.0751 77.0189 16.5276C82.6696 15.981 89.7495 15.7355 98.6304 15.4279L98.582 14.0288ZM145.381 57.695C144.996 46.5789 144.706 38.1824 143.787 31.8964C142.868 25.6155 141.302 21.2881 138.243 18.4338C135.184 15.5795 130.759 14.3169 124.429 13.8347C118.095 13.352 109.698 13.6438 98.582 14.0288L98.6304 15.4279C109.781 15.0418 118.084 14.7553 124.323 15.2306C130.566 15.7063 134.588 16.9379 137.288 19.4574C139.988 21.977 141.495 25.9032 142.401 32.099C143.307 38.2897 143.596 46.5931 143.982 57.7435L145.381 57.695ZM144.762 89.4446C146.252 82.6797 145.898 72.6257 145.381 57.695L143.982 57.7435C144.502 72.7697 144.837 82.5967 143.395 89.1434L144.762 89.4446ZM148.88 83.4004C147.356 84.9395 145.463 86.8513 143.575 88.8078L144.582 89.7802C146.464 87.8309 148.35 85.9251 149.875 84.3853L148.88 83.4004ZM148.904 83.3773L148.904 83.3775L149.851 84.4083L149.851 84.4081L148.904 83.3773ZM149.099 83.1786L148.88 83.4003L149.875 84.3852L150.094 84.1636L149.099 83.1786ZM149.686 82.5854C149.499 82.7753 149.303 82.9733 149.099 83.1786L150.094 84.1636C150.298 83.9582 150.494 83.76 150.682 83.5697L149.686 82.5854ZM138.709 99.2771C141.995 97.3589 144.915 94.342 147.064 91.3337C149.198 88.3467 150.651 85.256 150.88 83.1534L149.488 83.0018C149.298 84.7455 148.013 87.5981 145.925 90.5198C143.853 93.4203 141.07 96.2778 138.003 98.0681L138.709 99.2771ZM101.715 104.494C111.547 104.154 119.248 103.887 125.238 103.196C131.219 102.505 135.605 101.381 138.749 99.2522L137.964 98.093C135.112 100.024 131.01 101.12 125.078 101.805C119.156 102.489 111.521 102.754 101.666 103.095L101.715 104.494ZM54.9157 60.8278C55.3007 71.944 55.5904 80.3404 56.5101 86.6265C57.429 92.9074 58.9947 97.2347 62.0538 100.089C65.1129 102.943 69.5382 104.206 75.8676 104.688C82.2022 105.171 90.5986 104.879 101.715 104.494L101.666 103.095C90.5159 103.481 82.2124 103.768 75.9739 103.292C69.7302 102.817 65.7092 101.585 63.0089 99.0654C60.3085 96.5459 58.8018 92.6196 57.8953 86.4238C56.9896 80.2331 56.701 71.9297 56.3149 60.7793L54.9157 60.8278ZM56.1354 26.8356C55.0396 30.2386 54.5976 34.5838 54.4942 40.1243C54.3906 45.6713 54.6266 52.4799 54.9157 60.8278L56.3149 60.7793C56.0253 52.4177 55.7913 45.6517 55.8939 40.1504C55.9967 34.6427 56.4373 30.4658 57.468 27.2647L56.1354 26.8356Z"
              fill="#316474"
            ></path>
            <path
              d="M104.033 7.20602L103.984 7.20773C92.8918 7.59183 84.5108 7.88205 78.2341 8.80036C71.9532 9.71928 67.6258 11.285 64.7715 14.3441C61.9172 17.4031 60.6546 21.8284 60.1724 28.1579C59.6905 34.4831 59.9807 42.8641 60.3648 53.9558L60.3665 54.005L60.3682 54.0542C60.7523 65.146 61.0425 73.527 61.9608 79.8037C62.8798 86.0846 64.4455 90.412 67.5045 93.2663C70.5636 96.1206 74.9889 97.3832 81.3183 97.8654C87.6435 98.3473 96.0244 98.0571 107.116 97.673L107.166 97.6713L107.215 97.6696C118.307 97.2855 126.687 96.9953 132.964 96.0769C139.245 95.158 143.572 93.5923 146.427 90.5332C149.281 87.4742 150.544 83.0489 151.026 76.7194C151.508 70.3942 151.218 62.0132 150.833 50.9215L150.832 50.8723L150.83 50.8231C150.446 39.7313 150.156 31.3504 149.237 25.0736C148.319 18.7927 146.753 14.4653 143.694 11.611C140.635 8.75674 136.209 7.49413 129.88 7.0119C123.555 6.52999 115.174 6.82022 104.082 7.20432L104.033 7.20602Z"
              fill="#73F892"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M111.958 38.7872C112.258 42.7774 109.243 49.579 104.998 49.9433C100.751 50.3072 96.8817 44.0964 96.5818 40.1059C96.2814 36.1156 99.4799 32.5854 103.726 32.2213C107.972 31.8572 111.657 34.7968 111.958 38.7872Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M125.592 74.1498C125.678 75.0635 125.472 76.5944 124.182 76.7623C119.004 77.4349 113.251 77.8697 107.834 78.1719C101.265 78.5384 95.923 78.7679 91.2532 78.617C89.7642 78.5689 89.4869 77.1351 89.4034 76.2401C88.3549 65.0216 95.6064 55.4594 105.6 54.8821C115.593 54.3051 124.544 62.9316 125.592 74.1498Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M88.8021 38.5084C89.0405 41.3538 87.0896 46.171 84.2544 46.3914C81.419 46.6116 78.773 42.1514 78.5345 39.3058C78.296 36.4607 80.4014 33.9751 83.2365 33.755C86.0718 33.5348 88.5637 35.663 88.8021 38.5084Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M91.0653 51.7948C89.1225 51.0135 86.9018 50.6637 84.5659 50.8758C77.4907 51.5173 72.0543 57.0384 72.4234 63.2071C72.4527 63.6992 72.6009 64.4833 73.6507 64.4618C76.61 64.4011 79.9642 64.1531 83.9886 63.8026C84.7202 59.188 87.2953 54.9651 91.0653 51.7948Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M121.544 36.4276C121.503 39.2827 123.783 43.9534 126.627 43.9772C129.47 44.0007 131.801 39.3682 131.842 36.5129C131.884 33.6581 129.611 31.3241 126.768 31.3006C123.924 31.2771 121.585 33.5725 121.544 36.4276Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M120.206 49.8399C122.09 48.9261 124.281 48.4235 126.626 48.4735C133.729 48.624 139.534 53.7558 139.592 59.9354C139.597 60.4283 139.503 61.2207 138.455 61.272C135.498 61.4161 132.135 61.4007 128.096 61.3295C127.047 56.7765 124.186 52.7419 120.206 49.8399Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M53.7616 66.4347L58.0476 60.7999C58.5362 60.1576 59.1986 59.6695 59.9563 59.3937C61.9444 58.6699 59.7131 61.3124 60.4388 63.3057L71.8532 94.658C72.5931 96.6902 75.9812 97.3224 73.9544 98.0603C73.2402 98.3203 72.4697 98.3857 71.7214 98.2498L65.1534 97.0569C60.8444 96.2743 56.4565 96.16 52.1414 96.7054C51.8387 96.7437 51.6832 97.0856 51.8486 97.342C52.9063 98.9808 53.9831 100.715 54.0504 100.834L56.3256 104.856C57.6481 107.193 56.6765 110.16 54.2309 111.253C52.4889 112.031 50.4453 111.635 49.1159 110.26C47.9138 108.939 41.3181 99.6727 39.4433 100.26C35.2784 101.564 30.7806 99.3625 29.2683 95.2088L27.8071 91.1954C26.2511 86.9214 28.4453 82.1985 32.708 80.6465C33.2969 80.4322 33.8925 80.2269 34.4892 80.0213C41.8165 77.4968 49.0646 72.6099 53.7616 66.4347Z"
              fill="#42CBA5"
              stroke="#316474"
              strokeWidth="1.4"
            ></path>
            <path
              d="M41.0622 99.5245L41.313 100.178L41.313 100.178L41.0622 99.5245ZM64.5587 97.5402L64.713 96.8574L64.5587 97.5402ZM71.4642 99.1005L71.3099 99.7833L71.3099 99.7833L71.4642 99.1005ZM73.5905 97.6449L73.1921 98.2205L73.1921 98.2205L73.5905 97.6449ZM27.5717 94.044L28.1023 95.5015L29.4179 95.0225L28.8873 93.5651L27.5717 94.044ZM28.1023 95.5015C29.79 100.137 34.9078 102.533 39.5354 100.849L39.0565 99.533C35.1586 100.952 30.8423 98.9349 29.4179 95.0225L28.1023 95.5015ZM39.5354 100.849C40.1309 100.632 40.7248 100.404 41.313 100.178L40.8113 98.8709C40.2212 99.0975 39.6386 99.3211 39.0565 99.533L39.5354 100.849ZM41.313 100.178C48.4357 97.4439 56.988 96.5473 64.4044 98.223L64.713 96.8574C56.9939 95.1133 48.1592 96.0504 40.8113 98.8709L41.313 100.178ZM64.4044 98.223L71.3099 99.7833L71.6185 98.4177L64.713 96.8574L64.4044 98.223ZM71.3099 99.7833C71.7033 99.8722 72.3223 100.01 72.9452 100.088C73.5293 100.162 74.265 100.206 74.8187 100.005L74.3398 98.6892C74.1358 98.7634 73.7075 98.7734 73.1203 98.6994C72.5719 98.6302 72.0122 98.5067 71.6185 98.4177L71.3099 99.7833ZM74.8187 100.005C75.143 99.8866 75.6016 99.6361 75.6852 99.1023C75.7602 98.6233 75.4651 98.2561 75.3085 98.0853C75.1176 97.8771 74.8697 97.6845 74.6474 97.524C74.4268 97.3648 74.171 97.1954 73.9888 97.0693L73.1921 98.2205C73.4141 98.3742 73.6188 98.5082 73.828 98.6592C74.0354 98.8089 74.1866 98.9333 74.2767 99.0315C74.4011 99.1672 74.2691 99.096 74.302 98.8856C74.3436 98.6203 74.555 98.6108 74.3398 98.6892L74.8187 100.005ZM73.9888 97.0693C73.2646 96.5681 72.5845 96.0695 72.3423 95.4044L71.0268 95.8833C71.4484 97.0414 72.5539 97.7788 73.1921 98.2205L73.9888 97.0693Z"
              fill="#316474"
            ></path>
            <ellipse
              cx="66.7941"
              cy="79.7409"
              rx="5.50187"
              ry="21.2215"
              transform="rotate(-20.0051 66.7941 79.7409)"
              fill="#1C997D"
              stroke="#316474"
              strokeWidth="1.4"
            ></ellipse>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M64.9565 87.7771C63.8763 85.6006 62.8299 83.1626 61.8794 80.5519C61.1293 78.4916 60.4942 76.4753 59.9786 74.5561C63.1803 73.555 66.7558 75.5579 68.0585 79.136C69.3411 82.659 67.9544 86.4288 64.9565 87.7771Z"
              fill="#BBE4DD"
            ></path>
            <path
              d="M64.9565 87.7771L64.3295 88.0883L64.6291 88.692L65.2436 88.4155L64.9565 87.7771ZM59.9786 74.5561L59.7697 73.8879L59.1281 74.0885L59.3025 74.7377L59.9786 74.5561ZM65.5835 87.466C64.5156 85.314 63.4792 82.9001 62.5371 80.3124L61.2216 80.7914C62.1805 83.4251 63.2371 85.8872 64.3295 88.0883L65.5835 87.466ZM62.5371 80.3124C61.7937 78.2705 61.1648 76.2735 60.6546 74.3744L59.3025 74.7377C59.8236 76.6771 60.4649 78.7127 61.2216 80.7914L62.5371 80.3124ZM60.1874 75.2242C62.9667 74.3552 66.2011 76.0805 67.4007 79.3755L68.7162 78.8966C67.3104 75.0353 63.394 72.7548 59.7697 73.8879L60.1874 75.2242ZM67.4007 79.3755C68.5814 82.6185 67.2737 85.9674 64.6694 87.1387L65.2436 88.4155C68.6352 86.8901 70.1008 82.6995 68.7162 78.8966L67.4007 79.3755Z"
              fill="#316474"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.9667 28.0094C4.57512 27.5552 8.07616 26.9073 8.99039 26.0646C10.1173 25.0262 10.4303 21.4254 10.578 18.4254C10.6027 17.9173 11.3354 17.8694 11.4258 18.3702C11.9226 21.1176 12.6331 24.5547 13.6691 25.4595C14.7044 26.3632 18.396 26.5976 21.2498 26.7206C21.7596 26.7425 21.8089 27.4772 21.3067 27.567C18.439 28.081 14.7825 28.8251 13.882 29.9152C13.0323 30.9436 12.8366 34.9595 12.7256 37.8727C12.7062 38.386 11.9635 38.4348 11.8762 37.9288C11.3855 35.0777 10.6676 31.1369 9.71101 30.2289C8.67483 29.2463 4.94968 28.9872 2.01998 28.8566C1.50915 28.8339 1.46272 28.0973 1.9667 28.0094Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.9302 14.9584C23.7418 14.5974 28.862 14.0576 30.275 12.9457C32.0165 11.5755 32.8733 6.41971 33.424 2.11139C33.5169 1.38153 34.5786 1.395 34.6524 2.12718C35.0593 6.14402 35.6965 11.1791 37.0882 12.6003C38.479 14.0197 43.7746 14.7733 47.875 15.272C48.6075 15.3609 48.5958 16.4257 47.8617 16.4986C43.6696 16.9167 38.3143 17.5777 36.8934 19.0478C35.5525 20.4348 34.8182 26.2023 34.3302 30.3896C34.2442 31.1275 33.168 31.1142 33.0992 30.3748C32.7129 26.2092 32.1216 20.4471 30.8449 19.0304C29.4617 17.497 24.1205 16.7041 19.9116 16.1858C19.1777 16.0955 19.1937 15.0284 19.9302 14.9584Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M148.272 6.61712C148.757 4.61172 150.776 3.37606 152.782 3.85719L177.328 9.74423C179.335 10.2254 180.568 12.2411 180.084 14.2465L177.358 25.5348C176.874 27.5402 174.855 28.7758 172.849 28.2947L139.62 20.3255C139.531 20.3041 139.486 20.2656 139.459 20.2302C139.427 20.1888 139.404 20.129 139.401 20.0586C139.398 19.9881 139.416 19.9265 139.444 19.8825C139.469 19.8449 139.51 19.8026 139.597 19.7737L142.698 18.7411C144.488 18.1452 145.845 16.6693 146.288 14.8369L148.272 6.61712Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.72407"
            ></path>
            <path
              d="M153.339 8.63727C152.876 8.52624 152.41 8.81139 152.298 9.27418C152.187 9.73696 152.471 10.2021 152.934 10.3132L153.339 8.63727ZM174.245 15.4241C174.708 15.5351 175.174 15.25 175.286 14.7872C175.397 14.3244 175.113 13.8592 174.65 13.7482L174.245 15.4241ZM152.934 10.3132L174.245 15.4241L174.65 13.7482L153.339 8.63727L152.934 10.3132Z"
              fill="#CEE3EA"
            ></path>
            <path
              d="M152.363 12.6824C151.9 12.5714 151.434 12.8566 151.322 13.3193C151.21 13.7821 151.495 14.2473 151.958 14.3583L152.363 12.6824ZM173.268 19.4693C173.731 19.5803 174.197 19.2952 174.309 18.8324C174.421 18.3696 174.136 17.9044 173.673 17.7934L173.268 19.4693ZM151.958 14.3583L173.268 19.4693L173.673 17.7934L152.363 12.6824L151.958 14.3583Z"
              fill="#CEE3EA"
            ></path>
            <path
              d="M151.385 16.7281C150.922 16.6171 150.457 16.9022 150.345 17.365C150.233 17.8278 150.518 18.293 150.981 18.404L151.385 16.7281ZM172.291 23.5149C172.754 23.626 173.22 23.3408 173.332 22.878C173.444 22.4152 173.159 21.9501 172.696 21.839L172.291 23.5149ZM150.981 18.404L172.291 23.5149L172.696 21.839L151.385 16.7281L150.981 18.404Z"
              fill="#CEE3EA"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M153.537 110.441C157.212 109.801 162.144 108.888 163.431 107.701C165.019 106.238 165.46 101.166 165.668 96.9396C165.703 96.2237 166.735 96.1563 166.862 96.8618C167.562 100.732 168.563 105.574 170.022 106.849C171.481 108.122 176.681 108.452 180.701 108.625C181.42 108.656 181.489 109.691 180.782 109.817C176.742 110.542 171.591 111.59 170.322 113.125C169.125 114.574 168.85 120.231 168.693 124.335C168.666 125.058 167.62 125.127 167.497 124.414C166.806 120.398 165.794 114.846 164.447 113.567C162.987 112.183 157.739 111.818 153.612 111.634C152.893 111.602 152.827 110.565 153.537 110.441Z"
              fill="white"
              stroke="#316474"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M201.351 45.789C201.752 43.7654 200.436 41.8018 198.412 41.4032L164.539 34.7338C162.515 34.3352 160.549 35.6526 160.148 37.6763L158.25 47.2457C157.849 49.2693 159.165 51.2329 161.189 51.6315L206.57 60.5669C206.842 60.6203 207.025 60.2971 206.84 60.0922L201.849 54.578C200.692 53.3002 200.208 51.5506 200.544 49.8589L201.351 45.789Z"
              fill="#42CBA5"
              stroke="#316474"
              strokeWidth="1.72407"
            ></path>
            <path
              d="M165.71 40.1044C165.243 40.0124 164.789 40.3164 164.696 40.7834C164.604 41.2504 164.907 41.7036 165.374 41.7955L165.71 40.1044ZM193.353 47.3045C193.821 47.3965 194.274 47.0925 194.367 46.6255C194.459 46.1585 194.156 45.7053 193.689 45.6133L193.353 47.3045ZM165.374 41.7955L193.353 47.3045L193.689 45.6133L165.71 40.1044L165.374 41.7955Z"
              fill="#33AF8D"
            ></path>
            <path
              d="M164.656 45.4158C164.189 45.3238 163.736 45.6278 163.643 46.0948C163.55 46.5618 163.854 47.015 164.321 47.1069L164.656 45.4158ZM192.3 52.6159C192.767 52.7079 193.221 52.4039 193.314 51.9369C193.406 51.4699 193.103 51.0167 192.635 50.9247L192.3 52.6159ZM164.321 47.1069L192.3 52.6159L192.635 50.9247L164.656 45.4158L164.321 47.1069Z"
              fill="#33AF8D"
            ></path>
          </svg>
        </span>

        <h1>Introducing communities</h1>
        <p>
          Easily organize your related groups and send announcements. Now, your
          communities, like neighborhoods or schools, can have their own space.
        </p>

        <ButtonPrimary>{"start a community"}</ButtonPrimary>
      </div>
    </div>
  );
}

export default React.memo(Communities);
