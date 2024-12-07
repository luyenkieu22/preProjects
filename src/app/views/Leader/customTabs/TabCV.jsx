import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import FormatQuoteOutlinedIcon from "@material-ui/icons/FormatQuoteOutlined";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ErrorIcon from "@material-ui/icons/Error";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SchoolIcon from "@material-ui/icons/School";
import { GENDER, POSITION } from "app/const/statusEmployee";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import DialogExperience from "../../../component/customDialog/DialogExperience";
import {
    deleteExperienceAction,
    getExperienceByEmployeeAction,
} from "app/redux/actions/experiencesAction";
import "../../../../styles/views/_form.scss";
import { useConfirm } from "app/component/useConfirm";
import { toast } from "react-toastify";

const TabCV = ({ skill, activity, setSkill, setActivity, canUpdate }) => {
    const classes = useStyle();
    const { employee } = useSelector((state) => state.employees);
    const { certificates } = useSelector((state) => state.certificates);
    const { experiences, isLoading } = useSelector((state) => state.experiences);
    const dispatch = useDispatch();
    const [listSkill, setListSkill] = useState(skill ? skill.split("\n") : []);
    const [listActivity, setListActivity] = useState(
        activity ? activity.split("\n") : []
    );
    const [experience, setExperience] = useState({});
    const [updateSkill, setUpdateSkill] = useState(false);
    const [updateActivity, setUpdateActivity] = useState(false);
    const [experienceDialog, setExperienceDialog] = useState(false);
    const [DialogConfirm, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa kinh nghiệm này không?"
    );

    useEffect(() => {
        dispatch(getExperienceByEmployeeAction(employee?.id));
    }, [dispatch, employee.id, isLoading]);

    const handleSaveActivity = () => {
        if (activity && activity.trim()) {
            setListActivity(activity?.split("\n"));
            setUpdateActivity(false);
        } else {
            toast.warning("Hoạt động không được để trống!")
        }
    };

    const handleDeleteExperience = async (id) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteExperienceAction(id));
    };

    const handleUpdateExperience = (data) => {
        setExperience(data);
        setExperienceDialog(true);
    };

    const handleSaveSkill = () => {
        if (skill && skill.trim()) {
            setListSkill(skill?.split("\n"));
            setUpdateSkill(false);
        } else {
            toast.warning("Kỹ năng không được để trống!")
        }
    };

    const profileData = [
        {
            item: <PhoneIcon className={classes.icon} />,
            label: "Số điện thoại",
            value: employee?.phone,
        },
        {
            item: <MailIcon className={classes.icon} />,
            label: "Email",
            value: employee?.email,
        },
        {
            item: <HomeIcon className={classes.icon} />,
            label: "Địa chỉ",
            value: employee?.address,
        },
        {
            item: <CalendarTodayIcon className={classes.icon} />,
            label: "Ngày sinh",
            value: moment(new Date(employee?.dateOfBirth)).format("DD/MM/YYYY"),
        },
        {
            item: <ErrorIcon className={classes.icon} />,
            label: "Giới tính",
            value: GENDER[employee?.gender]?.name,
        },
    ];

    return (
        <>
            <DialogConfirm />
            <Box className={classes.container}>
                <Grid container className={classes.boxContent}>

                    {/* ----------------------- Box left ----------------------- */}
                    <Grid item xs={7} spacing={4} className={classes.boxLeft}>
                        <img
                            style={{
                                width: "240px",
                                height: "240px",
                                borderRadius: "100%",
                                border: "1px solid #cccccc",
                            }}
                            src={
                                employee?.image ? employee?.image : "/assets/images/avatar.jpg"
                            }
                            alt="avatar"
                        />
                        <Grid item>
                            <Typography
                                variant="body2"
                                style={{
                                    fontSize: "30px",
                                    color: "#00b4d8",
                                    fontWeight: "600",
                                }}
                            >
                                {employee?.name}
                            </Typography>
                            <Typography className={classes.textTitle}>
                                {POSITION[employee?.currentPosition]?.value}
                            </Typography>
                        </Grid>
                        <Grid item xs={11} style={{ marginTop: "20px" }}>
                            <Typography className={classes.textTitle}>
                                Mục tiêu nghề nghiệp
                            </Typography>
                            <Typography>
                                <FormatQuoteOutlinedIcon />
                                <span style={{ fontSize: "14px" }}>
                                    Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết
                                    về thị trường để trở thành một nhân viên bán hàng chuyên
                                    nghiệp, mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công
                                    ty tăng số lượng khách hàng và mở rộng tập khách hàng.
                                </span>
                            </Typography>
                        </Grid>
                        <Grid item style={{ marginTop: "20px" }}>
                            <Box className={classes.iconSkill}>
                                <Typography className={classes.textTitle}>
                                    Kinh nghiệm làm việc
                                </Typography>
                                {canUpdate && (
                                    <AddIcon
                                        fontSize="small"
                                        color="primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setExperienceDialog(true)}
                                    />
                                )}
                            </Box>
                            {experienceDialog && (
                                <DialogExperience
                                    open={experienceDialog}
                                    data={experience}
                                    setData={setExperience}
                                    setOpen={setExperienceDialog}
                                    idEmployee={employee?.id}
                                />
                            )}
                            {experiences?.map((experience) => (
                                <Box key={experience?.id} marginTop={2}>
                                    <Box
                                        className={classes.iconSkill}
                                        justifyContent={"space-between"}
                                    >
                                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                                            {moment(new Date(experience?.startDate)).format(
                                                "DD/MM/YYYY"
                                            )}{" "}
                                            -{" "}
                                            {moment(new Date(experience?.endDate)).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Typography>
                                        {canUpdate && (
                                            <Box className={classes.iconSkill}>
                                                <EditIcon
                                                    fontSize="small"
                                                    color="primary"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleUpdateExperience(experience)}
                                                />
                                                <DeleteIcon
                                                    fontSize="small"
                                                    color="error"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDeleteExperience(experience?.id)}
                                                />
                                            </Box>
                                        )}
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        className={classes.textDescription}
                                    >
                                        <span style={{ fontWeight: 500 }}>
                                            {experience?.companyName}
                                        </span>
                                        :
                                        <span style={{ fontWeight: 500 }}>
                                            {" "}
                                            {experience?.companyAddress}
                                        </span>
                                    </Typography>
                                    <Box>
                                        <Typography style={{ fontWeight: 500 }}>Mô tả công việc</Typography>
                                        <Typography className={classes.textDescription}>• {experience?.jobDescription}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item style={{ marginTop: "20px" }}>
                            <Box className={classes.iconSkill}>
                                <Typography className={classes.textTitle}>Hoạt động</Typography>
                                {canUpdate && (
                                    <EditIcon
                                        fontSize="small"
                                        color="primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUpdateActivity(true)}
                                    />
                                )}
                            </Box>
                            {updateActivity && (
                                <>
                                    <TextField
                                        multiline
                                        variant="standard"
                                        className="underline-dash"
                                        value={activity}
                                        onChange={(e) => setActivity(e.target.value)}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setUpdateActivity(false)}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveActivity}
                                    >
                                        Lưu
                                    </Button>
                                </>
                            )}
                            {listActivity?.map((activity, index) => (
                                <Box key={index} className={classes.textDescription}>- {activity}</Box>
                            ))}
                        </Grid>
                    </Grid>

                    {/* ----------------------- Box right ----------------------- */}
                    <Grid item xs={5} className={classes.boxRight}>
                        <Box className={classes.iconBackground}></Box>
                        {profileData.map((icon) => (
                            <Box className={classes.boxProfile}>
                                {icon?.item}
                                <Box>
                                    <Typography variant="body2">{icon?.label}</Typography>
                                    <Typography variant="body2" className={classes.textOverflow}>
                                        {icon?.value}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        <Box className={classes.boxProfile2}>
                            <Box className={classes.iconBackground2}></Box>
                            <Box className={classes.iconSkill}>
                                <SchoolIcon className={classes.icon} />
                                <Typography className={classes.textTitle}>Kỹ năng</Typography>
                                {canUpdate && (
                                    <EditIcon
                                        fontSize="small"
                                        color="primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setUpdateSkill(true)}
                                    />
                                )}
                            </Box>
                            {updateSkill && (
                                <>
                                    <TextField
                                        multiline
                                        variant="standard"
                                        className="underline-dash"
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => setUpdateSkill(false)}
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveSkill}
                                    >
                                        Lưu
                                    </Button>
                                </>
                            )}
                            {listSkill?.map((skill, index) => (
                                <Box key={index}>- {skill}</Box>
                            ))}
                        </Box>
                        <Box className={classes.boxProfile2}>
                            <Box className={classes.iconBackground2} marginTop={"2px"}></Box>
                            <Box>
                                <SettingsIcon className={classes.icon} />
                                <Typography className={classes.textTitle}>Chứng chỉ</Typography>
                            </Box>
                            {certificates?.map((certificate) => (
                                <Box key={certificate?.id} style={{ marginTop: "10px" }}>
                                    <Box className={classes.iconSkill}>
                                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                                            {certificate?.certificateName}
                                        </Typography>
                                        -
                                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                                            {moment(new Date(certificate?.issueDate)).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" className={classes.textDescription}>
                                        {certificate?.content}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TabCV;

const useStyle = makeStyles({
    container: {
        backgroundColor: "#cccccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "14px 80px",
    },
    boxContent: {
        backgroundColor: "#ffff",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
    },
    boxRight: {
        backgroundColor: "#f2fbfd",
        paddingTop: "10px",
        paddingLeft: "40px",
        position: "relative",
    },
    boxProfile: {
        position: "relative",
        display: "flex",
        paddingTop: "14px",
        gap: 2,
    },
    boxProfile2: {
        position: "relative",
        marginTop: "40px",
    },
    iconBackground: {
        backgroundColor: "#00b4d8",
        position: "absolute",
        width: "40px",
        height: "300px",
        top: 0,
        left: "-20px",
        borderRadius: "20px",
    },
    iconBackground2: {
        backgroundColor: "#00b4d8",
        position: "absolute",
        width: "40px",
        height: "40px",
        top: -3,
        left: "-58px",
        borderRadius: "20px",
    },
    icon: {
        position: "absolute",
        top: "3px",
        left: "-50px",
        color: "#fff",
    },
    textTitle: {
        fontSize: "20px",
        color: "#00b4d8",
        fontWeight: "600",
    },
    textDescription: {
        width: "60%",
        flexWrap: "wrap",
    },
    textOverflow: {
        width: "280px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    iconSkill: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
});
