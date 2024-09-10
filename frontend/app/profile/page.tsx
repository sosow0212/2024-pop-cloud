import ProfileSignIn from "./_components/profile-signIn";

/**
 *
 * 로그인 유저라면 프로필 사진
 * 비로그인 유저라면 로그인/회원가입
 */
const ProfilePage = async () => {
  // const currentUser = await getCurrentUser()
  return (
    <section className="flex h-full flex-col space-y-4 py-2">
      <div className="space-y-4 divide-y-2 divide-slate-200">
        {/* 미션 뱃지 */}
        <ProfileSignIn />
        <div className="flex items-center space-x-10 py-2">
          <div className="flex flex-col items-center justify-center">
            <div>달성한 미션</div>
            <div>미션 갯수</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>뱃지</div>
            <div>뱃지 갯수</div>
          </div>
        </div>

        {/* 유저 정보   */}
        <ul className="space-y-4 py-2">
          <li className="flex cursor-pointer items-center justify-between">
            <div>정보 수정</div>
            <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>북마크 (즐겨찾기)</div>
            <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>좋아요</div> <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>댓글</div> <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>결제 내역</div>
            <div>{">"}</div>
          </li>
        </ul>
        {/* 유저   */}
        <ul className="space-y-4 py-2">
          <li className="flex cursor-pointer items-center justify-between">
            <div>출석체크 </div>
            <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>방문한 곳 </div>
            <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>방문 예정인 곳 (결제 한 장소들 /결제날 지났다면 여기로?)</div>
            <div>{">"}</div>
          </li>
          <li className="flex cursor-pointer items-center justify-between">
            <div>작성한 리뷰</div>
            <div>{">"}</div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ProfilePage;
