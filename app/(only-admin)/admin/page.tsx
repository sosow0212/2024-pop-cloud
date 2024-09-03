import { DataTableDemo } from "../_components/data-table";

// 팝업 or 개인 전시회 등록
/**
 * 권한이 있는 유저만 접근 가능 (middleware로 제어하기)
 *
 */
const PostPage = () => {
  return (
    <section className="relative flex h-full flex-col space-y-4">
      <DataTableDemo />
    </section>
  );
};

export default PostPage;
