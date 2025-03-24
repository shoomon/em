package com.ssafy.em.posts.application;

import com.ssafy.em.posts.domain.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PostRedisService {
    public static final String POST_KEY = "post:";
    public static final String POST_GEO_KEY = "post:geo";
    private static final long TTL_SECONDS = 60 * 60 * 24;
    private final RedisTemplate<String, Object> redisTemplate;


    public void savePostToRedis(Post post){
        String key = POST_KEY + post.getId();
        redisTemplate.opsForValue().set(key, post, TTL_SECONDS, TimeUnit.SECONDS);
        redisTemplate.opsForGeo()
                .add(POST_GEO_KEY,
                        new Point(
                                post.getLocation().getX(),
                                post.getLocation().getY()
                        ),
                        String.valueOf(post.getId())
                );
    }

    public void deletePostFromRedis(int postId){
        String key = POST_KEY + postId;
        redisTemplate.delete(key);
        redisTemplate.opsForGeo().remove(POST_GEO_KEY, postId);
    }
}
