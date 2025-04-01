package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;

public interface PostCustomRepository {
    List<Post> getPostList(
            double longitude,
            double latitude,
            int radius,
            PostCursorDto cursor,
            String sortBy,
            int pageSize,
            Double lng1,
            Double lat1,
            Double lng2,
            Double lat2
    );

    List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    );

    List<Object[]> getCalendarEmotionList(
            int userId,
            YearMonth yearMonth
    );

    List<Post>getDatePostList(
            int userId,
            LocalDate date,
            int lastRead,
            int pageSize
    );

    List<Object[]> getMonthlyEmotionCount(
            int userId,
            YearMonth yearMonth
    );

}
