package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.document.LogDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostLogginRepository extends MongoRepository<LogDocument, String> {
}