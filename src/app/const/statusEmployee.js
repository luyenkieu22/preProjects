export const GENDER = [
    { id: 0, name: "Nam" },
    { id: 1, name: "Nữ" },
    { id: 2, name: "Khác" }
]

export const TEAMS = [
    { id: 0, name: "BA" },
    { id: 1, name: "BackEnd - Java" },
    { id: 2, name: "Frontend - ReactJs" },
    { id: 3, name: "Frontend - VueJs" },
    { id: 4, name: "Mobile - ReactNative" },
    { id: 5, name: "Tester" },
]

export const STATUS = [
    { id: 0, name: "Đã lưu" },
    { id: 1, name: "Lưu mới" },
    { id: 2, name: "Chờ xử lý" },
    { id: 3, name: "Đã được chấp nhận" },
    { id: 4, name: "Yêu cầu bổ sung" },
    { id: 5, name: "Từ chối" },
    { id: 6, name: "Chờ xử lý yêu cầu kết thúc" },
    { id: 7, name: "Chấp nhận yêu cầu kết thúc" },
    { id: 8, name: "Bổ sung yêu cầu kết thúc" },
    { id: 9, name: "Từ chối kết thúc" },
]

export const RELATIONSHIP = [
    { id: 0, name: "Bố" },
    { id: 1, name: "Mẹ" },
    { id: 2, name: "Vợ/Chồng" },
    { id: 3, name: "Anh/Chị" },
    { id: 4, name: "Ông bà" },
    { id: 5, name: "Chú" },
    { id: 6, name: "Cháu" },
    { id: 7, name: "Anh rể/Chị dâu" },
    { id: 8, name: "Con trai" },
    { id: 9, name: "Con gái" },
    { id: 10, name: "khác" },
]

export const STATUS_EMPLOYEE = {
    ADD: "1,2,4,5",
    MANAGE: "3,6,8,9",
    EDIT: "1,4,5,8,9",
    VIEW: "2,3,4,5,6,7,8",
    DELETE: "1",
    WAITING_APPROVAL: "2,6",
    WAITING_END_PROCESS: "6",
    APPROVED: "0,3,7",
    EDIT_CV: "1,4,5,6,8",
    NOTIFY: "4,5,8,9",
    ADDITIONAL_REQUEST_NOTIFY: "4,8",
    REJECT_NOTIFY: "5,9",
    END: "0,7",
    NOT_SAVED: "7"
}

export const POSITION = [
    {
        id: 1,
        value: "Thành viên nhóm BE"
    },
    {
        id: 2,
        value: "Trưởng nhóm Mobile"
    },
    {
        id: 3,
        value: "Quản lý dự án"
    },
    {
        id: 4,
        value: "Trưởng nhóm FE"
    },
    {
        id: 5,
        value: "Trưởng nhóm BE"
    },
    {
        id: 6,
        value: "Thành viên nhóm FE"
    },
    {
        id: 7,
        value: "Trưởng nhóm Design"
    },
    {
        id: 8,
        value: "Thành viên nhóm Mobile"
    }
]

export const LEADER = [
    {
        id: 36,
        leaderName: "Nguyen Van B",
        leaderPosition: 3,
        activeStatus: 1,
        userId: 7
    },
    {
        id: 35,
        leaderName: "Nguyen Van E",
        leaderPosition: 3,
        activeStatus: 2,
        userId: 6
    },
    {
        id: 34,
        leaderName: "Nguyen Van D",
        leaderPosition: 3,
        activeStatus: 1,
        userId: 5
    },
    {
        id: 2,
        leaderName: "Nguyen Van C",
        leaderPosition: 2,
        activeStatus: 1,
        userId: 4
    },
    {
        id: 1,
        leaderName: "Nguyen Van A",
        leaderPosition: 4,
        activeStatus: 1,
        userId: 3
    }
]

export const LEADER_POSITION = [
    {
        id: 0,
        value: "Trưởng nhóm Game"
    },
    {
        id: 1,
        value: "Trưởng nhóm Back-End"
    },
    {
        id: 2,
        value: "Trưởng nhóm Test"
    },
    {
        id: 3,
        value: "Trưởng nhóm Mobile"
    },
    {
        id: 4,
        value: "Trưởng nhóm Front-End"
    }
]

export const TYPE_PROPOSAL = [
    { id: 1, name: "Đề xuất tăng lương" },
    { id: 2, name: "Đề xuất giảm giờ làm việc" },
    { id: 3, name: "Đề xuất tăng chế độ nghỉ" },
    { id: 4, name: "Đề xuất tăng giờ làm" },
    { id: 5, name: "Đề xuất về họp bàn luận chiến lược" }
];
