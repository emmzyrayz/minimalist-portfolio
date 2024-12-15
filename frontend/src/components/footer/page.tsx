import "./foot.css";

export const Footer = () => {
  return (
    <div className="footer-section w-full h-full flex flex-row items-center justify-between bg-[--black] font-sora text-[--white] px-2 py-3">
      <div className="footer-name">
        <span className=" text-[18px] font-semibold ml-2">
          Nnamdi Emmanuel Dike
        </span>
      </div>
      <div className="footer-info text-[14px] flex flex-col items-end mr- justify-center">
        <p>@ 2023-2024 Personal</p>
        <p>Made by Emmanuel</p>
      </div>
    </div>
  );
};
