import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "zero-cnn";
import { ITarget } from "./header";

interface HeaderSearchProps {
  isShow: boolean;
  target: ITarget;
  setShow: (t: ITarget, curT: ITarget) => void;
}

const HeaderSearch = ({ isShow, target, setShow }: HeaderSearchProps) => {
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = (data: FormData) => {
    console.log(data.get("search"));
  };
  return (
    <>
      <button onClick={() => setShow("search", target)}>
        <Search />
      </button>
      <div
        className={cn(
          "fixed inset-0 z-50 mx-auto h-[100vh] max-w-xl overflow-hidden bg-yellow-300 object-right-top transition-all",
          isShow && target === "search" ? "block" : "hidden",
        )}
      >
        <main className="h-full space-y-5 bg-white py-4">
          <form
            action={handleSubmit}
            className="flex items-center justify-between space-x-2 px-2"
          >
            <label className="relative w-full" htmlFor="search">
              <input
                id="search"
                name="search"
                className="w-full rounded-md border bg-gray-100 p-2 pr-12"
                placeholder="검색 검색"
                maxLength={50}
                type="text"
              />
              <button type="submit" name="searchBtn">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
              </button>
            </label>
            <button
              type="button"
              name="btn"
              onClick={() => setShow("search", target)}
              className="whitespace-nowrap rounded-xl px-4 py-2 transition-all hover:bg-slate-100"
            >
              취소
            </button>
          </form>
          <PopularSearch />
        </main>
      </div>
    </>
  );
};

const PopularSearch = () => {
  return (
    <>
      {/* 인기 검색어 */}
      <section className="flex flex-col space-y-4 px-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">인기 검색어</h3>
          <div className="text-slate-400">전체보기 {`>`}</div>
        </div>
        <ol className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-y-1 px-2">
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">1</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">2</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">3</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">4</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">5</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">6</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">7</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">8</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">9</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">10</div>
            <div>성수낙낙</div>
          </li>
        </ol>
      </section>
      {/* 급상승 검색어 */}
      <section className="flex flex-col space-y-4 px-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">급상승 검색어</h3>
          <div className="text-slate-400">전체보기 {`>`}</div>
        </div>
        <ol className="grid grid-flow-col grid-cols-2 grid-rows-5 gap-y-1 px-2">
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">1</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">2</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right text-sky-400">3</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">4</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">5</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">6</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">7</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">8</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">9</div>
            <div>성수낙낙</div>
          </li>
          <li className="flex items-center">
            <div className="mr-3 w-4 text-right">10</div>
            <div>성수낙낙</div>
          </li>
        </ol>
      </section>
    </>
  );
};

export default HeaderSearch;
