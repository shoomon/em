package com.ssafy.em.posts.dto;

public record PostCursorDto(
        Integer id,
        Double distance,
        Integer emotionCount
) {
    public static PostCursorDto from(
            Integer cursorId,
            Double cursorDist,
            Integer cursorEmoCnt,
            String sortBy
    ) {
        switch (sortBy) {
            case "popular" -> {
                if(cursorId == 0 && cursorEmoCnt == 0){
                    return new PostCursorDto(Integer.MAX_VALUE, cursorDist, Integer.MAX_VALUE);
                }else{
                    return new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
            }
            case "distance" -> {
                if(cursorId == 0 && cursorDist == 0){
                    return new PostCursorDto(Integer.MAX_VALUE, cursorDist, Integer.MAX_VALUE);
                }else{
                    return new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
            }
            default -> {
                if (cursorId != null && cursorId != 0) {
                    return new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
            }
        }
        return null;
    }
}
