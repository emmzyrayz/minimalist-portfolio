import React from "react";

interface FoxSVGProps {
  width?: string;
  height?: string;
  fillColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  viewBox?: string;
}

export const LogoIconSVG: React.FC<FoxSVGProps> = ({
  width = "100%",
  height = "100%",
  primaryColor = "#000000",
  viewBox = "0 0 370 84.02784620502293",
}) => {
  return (
    <svg viewBox={viewBox} width={width} height={height}>
      <g
        id="SvgjsG1325"
        transform="matrix(0.9710684256810971,0,0,0.9710684256810971,-13.553564826922493,-6.539172200321389)"
        fill={primaryColor}
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M21.42,69.337c2.969,1.037,6.297,1.11,9.357,0.481c6.211-1.278,11.106-3.323,15.11-5.716  c1.058-0.633,1.768-1.707,1.938-2.928c0.611-4.398,1.71-15.272-1.543-19.773c-2.166-2.998-5.226-4.682-8.814-5.394  c-2.928-0.58-5.61-1.144-8.14-2.546c-0.529-0.293-0.341-1.096,0.263-1.109c3.124-0.068,6.254-0.113,9.337,0.359  c3.719,0.57,7.427,1.964,10.086,4.625c0.323-1.098,0.384-2.272,0.185-3.399c-0.064-0.361,0.35-0.611,0.642-0.389  c1.703,1.296,2.931,3.19,3.671,5.212c0.862,2.357,1.114,4.893,1.192,7.401c0.636-0.533,1.181-1.175,1.608-1.887  c0.22-0.368,0.771-0.296,0.861,0.123c0.146,0.681,0.332,1.372,0.367,1.817c0.103,1.334,0.117,2.675,0.041,4.011  c-0.138,2.421-0.566,4.84-1.216,7.175c0,0,9.875-12.5,4.917-25.583c-4.958-13.083-16.5-20.083-16.5-20.083s-3.875-5-5.583-5  c-1.708,0-0.917,9.832-0.917,9.834c0.062,0.776-1.752,2.349-2.228,2.933c-1.072,1.316-2.253,2.544-3.524,3.669  c-2.957,2.616-6.304,4.253-9.778,6.037c-0.378,0.194-0.794,0.434-0.898,0.845c-0.083,0.326,0.059,0.665,0.217,0.962  c2.696,5.053,10.406,6.622,15.545,6.804c0.337,0.012-0.099,1.922-0.135,2.03c-0.769,2.349-2.723,4.017-4.523,5.563  c-4.335,3.724-9.457,6.569-13.178,10.98c-1.214,1.439-2.27,3.059-2.75,4.879c-0.48,1.82-0.327,3.867,0.72,5.431  C18.602,67.975,19.972,68.832,21.42,69.337z M36.615,25.652c1.105,0,2,0.485,2,1.083s-0.895,1.083-2,1.083c-1.105,0-2-0.485-2-1.083  S35.511,25.652,36.615,25.652z"
        ></path>
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M86.033,76.402c0-9.087-6.891-15.884-15.864-16.244c-1.427-0.057-2.858,0.03-4.27,0.246  c-5.878,0.899-11.133,3.928-16.231,6.814c-5.267,2.981-10.465,5.697-16.429,7.031c-5.418,1.212-11.328,1.61-15.788-2.275  c-0.674-0.587-1.288-1.243-1.828-1.956c-0.262-0.346-0.783-1.525-1.371-1.401c-0.406,0.088-0.286,1.232-0.25,1.767  c0.529,7.758,3.485,15.942,10.53,20.026c3.796,2.2,8.286,3.118,12.661,2.791c8.599-0.642,16.598-5.358,24.726-7.912  c4.361-1.371,8.898-2.574,13.446-1.304c4.692,1.311,4.866,4.864,4.349,7.319c-0.142,0.674,0.697,1.116,1.154,0.6  C86.509,85.534,86.033,76.402,86.033,76.402z M71.389,71.113c-2.479-0.116-4.969,0.168-7.385,0.764  c-2.429,0.573-4.795,1.469-7.162,2.433c-2.362,0.982-4.716,2.07-7.174,2.986c2.047-1.634,4.198-3.107,6.497-4.386  c2.294-1.283,4.763-2.319,7.369-2.977c2.614-0.609,5.354-0.83,8.029-0.372c2.665,0.438,5.222,1.563,7.18,3.319  C76.339,71.837,73.869,71.244,71.389,71.113z"
        ></path>
      </g>

      <g
        id="SvgjsG1326"
        transform="matrix(3.706645440911633,0,0,3.706645440911633,87.77601308894627,-5.386546390081424)"
        fill={primaryColor}
      >
        <path d="M3.48 8.04 l0 9.42 l1.36 0 c0.12 0 0.19666 -0.02334 0.23 -0.07 s0.05 -0.12332 0.05 -0.22998 l0 -8.84 c0 -0.18666 -0.08666 -0.28 -0.26 -0.28 l-1.38 0 z M8 17.759999999999998 c0 0.8 -0.16666 1.3733 -0.5 1.72 s-0.92 0.52 -1.76 0.52 l-5.14 0 l0 -14.5 l5.68 0 c0.57334 0 1.0033 0.16 1.29 0.48 s0.43 0.74666 0.43 1.28 l0 10.5 z M9.2 5.5 l5.64 0 l0.5 2.7 l-3.16 0 l0 3.44 l2.4 0 l0 2.5 l-2.4 0 l0 3.16 l3.04 0 l-0.5 2.7 l-5.52 0 l0 -14.5 z M21.44 5.5 l2.94 0 l-2.68 14.5 l-3.02 0 l-2.68 -14.5 l2.94 0 l0.26 1.86 l0.98 7.5 l1 -7.54 z M28.139999999999997 11.72 l0.44 0 l1.48 -6.22 l3 0 l-1.74 6.68 l1.72 7.82 l-3.18 0 l-1.14 -5.98 l-0.58 0 l0 5.98 l-2.96 0 l0 -14.5 l2.96 0 l0 6.22 l0 0 z M33.86 5.5 l2.9 0 l0 14.5 l-2.9 0 l0 -14.5 z M43.68 5.5 l0.72 2.7 l-1.94 0 l0 11.8 l-2.96 0 l0 -11.8 l-1.94 0 l0.76 -2.7 l5.36 0 z M45.88 20 l-0.51996 -2.7 l3.12 0 c0.22666 0 0.34 -0.1 0.34 -0.3 l0 -2.64 c0 -0.2 -0.04 -0.32 -0.12 -0.36 s-0.22 -0.06 -0.42 -0.06 l-1.5 0 c-0.21334 0 -0.41668 -0.01666 -0.61002 -0.05 s-0.36668 -0.11 -0.52002 -0.23 s-0.27334 -0.28666 -0.36 -0.5 s-0.13 -0.5 -0.13 -0.86 l0 -4.92 c0 -0.57334 0.15666 -1.03 0.47 -1.37 s0.81 -0.51 1.49 -0.51 l4 0 l0.5 2.7 l-3.28 0 c-0.24 0 -0.36 0.10666 -0.36 0.32 l0 2.64 c0 0.14666 0.03666 0.24666 0.11 0.3 s0.18334 0.08 0.33 0.08 l1.82 0 c0.46666 0 0.82332 0.11 1.07 0.33 s0.37 0.60334 0.37 1.15 l0 4.78 c0 0.8 -0.16334 1.3667 -0.49 1.7 s-0.90332 0.5 -1.73 0.5 l-3.58 0 z M55.14 20 c-0.84 0 -1.4267 -0.17334 -1.76 -0.52 s-0.5 -0.92 -0.5 -1.72 l0 -12.26 l2.96 0 l0 11.64 c0 0.10666 0.01666 0.18666 0.05 0.24 s0.11 0.08 0.23 0.08 l1.02 0 c0.12 0 0.19666 -0.02666 0.23 -0.08 s0.05 -0.13334 0.05 -0.24 l0 -11.64 l2.96 0 l0 12.26 c0 0.8 -0.16666 1.3733 -0.5 1.72 s-0.92 0.52 -1.76 0.52 l-2.98 0 z M61.580000000000005 5.5 l2.76 0 l1.48 5.82 l0 -5.82 l2.98 0 l0 14.5 l-2.98 0 l-1.56 -6.06 l0 6.06 l-2.68 0 l0 -14.5 z M70 5.5 l5.64 0 l0.5 2.7 l-3.16 0 l0 3.44 l2.4 0 l0 2.5 l-2.4 0 l0 3.16 l3.04 0 l-0.5 2.7 l-5.52 0 l0 -14.5 z"></path>
      </g>
    </svg>
  );
};