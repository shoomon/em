package com.ssafy.em.posts.application;

import com.ssafy.em.posts.domain.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class PostRedisService {
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String POST_KEY = "post:";
    private static final long TTL_SECONDS = 60 * 60 * 24;


    public void savePostToRedis(Post post){
        String key = POST_KEY + post.getId();
        redisTemplate.opsForValue().set(key, post, TTL_SECONDS, TimeUnit.SECONDS);
    }

    public void deletePostFromRedis(int postId){
        String key = POST_KEY + postId;
        redisTemplate.delete(key);
    }
}
