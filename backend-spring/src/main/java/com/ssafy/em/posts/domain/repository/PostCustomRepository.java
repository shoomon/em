package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostPointDto;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface PostCustomRepository {
    List<Post> getPostList(
            double longitude,
            double latitude,
            int radius,
            Integer lastReadId,
            String sortBy,
            int pageSize
    );

    List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    );
}
