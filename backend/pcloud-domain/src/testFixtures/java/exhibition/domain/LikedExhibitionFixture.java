package exhibition.domain;

import com.domain.exhibition.domain.LikedExhibition;

@SuppressWarnings("NonAsciiCharacters")
public class LikedExhibitionFixture {

    public static LikedExhibition 개인_전시회_좋아요_생성() {
        return LikedExhibition.builder()
                .exhibitionId(1L)
                .memberId(1L)
                .build();
    }

    public static LikedExhibition 개인_전시회_좋아요_생성_개인전시회아이디_회원아이디(final Long exhibitionId, final Long memberId) {
        return LikedExhibition.builder()
                .exhibitionId(exhibitionId)
                .memberId(memberId)
                .build();
    }
}
