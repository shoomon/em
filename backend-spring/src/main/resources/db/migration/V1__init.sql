-- 감정 테이블
CREATE TABLE emotions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    hex_color CHAR(9) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 동물 ENUM 타입 생성 (한 번만 실행)
DO $$ BEGIN
CREATE TYPE animal_type AS ENUM ('CAT', 'DOG', 'PANDA', 'RABBIT', 'FOX', 'HAMSTER', 'SHEEP', 'SEAL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- 회원 ENUM 타입 생성 (한 번만 실행)
DO $$ BEGIN
CREATE TYPE provider_type AS ENUM ('KAKAO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


-- 동물 프로필 테이블
CREATE TABLE animal_profiles (
    id SERIAL PRIMARY KEY,
    type animal_type NOT NULL,
    emotion_id INT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_animal_profiles_emotion FOREIGN KEY (emotion_id) REFERENCES emotions(id) ON DELETE CASCADE
);


-- 회원 테이블
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    provider provider_type NOT NULL,
    social_id VARCHAR(100) NULL,
    username VARCHAR(50) NOT NULL,
    profile_image_url TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL  -- 트리거 사용
);


-- updated_at 자동 갱신 트리거 생성 (PostgreSQL에서 ON UPDATE CURRENT_TIMESTAMP 대체)
CREATE FUNCTION update_modified_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거를 users 테이블에 적용
CREATE TRIGGER trigger_update_users
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();


-- 게시글 테이블
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    animal_profile_id INT NOT NULL,
    anonymous_nickname VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    address VARCHAR(255) NULL DEFAULT 'UNKNOWN LOCATION',
    reaction_count INT NOT NULL DEFAULT 0,  -- 기본값 0
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- FK 설정
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_posts_animal_profile FOREIGN KEY (animal_profile_id) REFERENCES animal_profiles(id) ON DELETE CASCADE
);


-- 게시글 공감 테이블
CREATE TABLE post_reactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    emotion_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- FK 설정
    CONSTRAINT fk_post_reactions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_reactions_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_reactions_emotion FOREIGN KEY (emotion_id) REFERENCES emotions(id) ON DELETE CASCADE
);
