import FooterIcon from "./footer-icon";

const Footer = () => {
  return (
    <footer className="flex flex-col items-start justify-between space-y-4 bg-slate-50 px-4 pb-20 pt-2">
      <div className="text-[0.8rem] font-medium uppercase">
        © 2024 team pop-cloud all rights reserved
      </div>
      <div className="text-[0.7rem] text-slate-400">
        일부 상품의 경우 팀 팝클라우드 통신판매의 당사자가 아닌
        통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수
        있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
      </div>
      <ul className="flex w-full items-center justify-start space-x-2">
        <FooterIcon link="#" icon="github" />
        <FooterIcon link="#" icon="instagram" />
        <FooterIcon link="#" icon="x" />
      </ul>
    </footer>
  );
};

export default Footer;
