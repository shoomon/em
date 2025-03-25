package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostPointDto;

import java.util.List;

public interface PostCustomRepository {
    List<Post> getPostList(
            double longitude,
            double latitude,
            int radius,
            PostCursorDto cursor,
            String sortBy,
            int pageSize
    );

    List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    );

    List<Post> getClusteredPostList(
            double lng1,
            double lat1,
            double lng2,
            double lat2
    );
}
