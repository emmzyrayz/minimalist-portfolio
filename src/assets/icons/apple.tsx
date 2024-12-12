import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
}

export const AppleIcons: React.FC<SVGProps> = ({
  width = "32",
  height = "32",
  ...props
}) => {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 16C30 23.728 23.735 30 16 30C8.265 30 2 23.728 2 16C2 8.265 8.265 2 16 2C23.735 2 30 8.265 30 16Z"
          fill="#283544"
        />
        <path
          d="M22.5621 12.4574C22.4857 12.502 20.6671 13.4425 20.6671 15.5279C20.7528 17.9061 22.9621 18.7401 23 18.7401C22.9621 18.7847 22.6665 19.8763 21.7907 21.0205C21.0956 22.0062 20.3242 23 19.1528 23C18.0385 23 17.6385 22.3431 16.3528 22.3431C14.972 22.3431 14.5813 23 13.5242 23C12.3528 23 11.5242 21.953 10.7913 20.9766C9.8391 19.6986 9.02978 17.6931 9.00121 15.7675C8.98195 14.7471 9.19189 13.744 9.72481 12.8921C10.477 11.7026 11.8198 10.8952 13.2863 10.8686C14.4099 10.8333 15.4099 11.5875 16.0956 11.5875C16.7528 11.5875 17.9814 10.8686 19.3714 10.8686C19.9714 10.8692 21.5714 11.0376 22.5621 12.4574ZM16.0006 10.6649C15.8006 9.73303 16.3528 8.80119 16.8671 8.20677C17.5242 7.48792 18.5621 7 19.4571 7C19.5143 7.93185 19.1522 8.84575 18.505 9.51136C17.9242 10.2302 16.9242 10.7714 16.0006 10.6649Z"
          fill="white"
        />
      </svg>
    );
};