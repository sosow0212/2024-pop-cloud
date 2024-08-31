package show.popups.infrastructure;

import com.domain.show.popups.domain.service.PopularityCalculator;

public class FakePopularityCalculator implements PopularityCalculator {

    @Override
    public double calculatePopularity(final int viewCount, final int likedCount) {
        return viewCount * 0.3 + likedCount;
    }
}
