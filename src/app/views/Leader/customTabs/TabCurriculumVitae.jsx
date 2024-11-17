import {
    Avatar,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { GENDER, RELATIONSHIP } from "app/const/statusEmployee";
import { getFamilyByEmployeeIdAction } from "app/redux/actions/familyAction";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../styles/views/_tabCurriculum.scss";

const TabCurriculumVitae = ({ employeeData }) => {
    const { family, isLoading } = useSelector((state) => state.family);
    const dispatch = useDispatch();
    const fetchFamily = useCallback(() => {
        dispatch(getFamilyByEmployeeIdAction(employeeData?.id));
    }, [dispatch, employeeData.id]);

    useEffect(() => {
        fetchFamily();
    }, [fetchFamily, isLoading]);

    return (
        <Box className="container-vitae">
            <Box className="body-vitae">
                {/* Title */}
                <div className="vitae-title">
                    <Grid container justify="center">
                        <Grid item xs={5}>
                            <Avatar
                                className="image"
                                src={
                                    employeeData?.image
                                        ? employeeData?.image
                                        : "/assets/images/avatar.jpg"
                                }
                                alt={employeeData?.name}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <Box className="box-title">
                                <h3 className="text-title font-bold">
                                    Cộng hòa xã hội chủ nghĩa việt nam
                                </h3>
                                <h4 style={{ display: "flex", justifyContent: "center" }} className="underline-title text-title font-bold">
                                    Độc lập - Tự do - Hạnh phúc
                                </h4>
                            </Box>
                            <h3 className="text-title font-bold mt-24">
                                Sơ yếu lý lịch
                            </h3>
                        </Grid>
                    </Grid>
                </div>
                <div className="vitae-body">
                    {/* TT ban than */}
                    <Box className="body-profile">
                        <h4 className="header-text">I. Thông tin bản thân</h4>
                        <div className="detail-profile-self">
                            <Grid container>
                                <Grid item xs={12} md={8} className="flex">
                                    <span className="text-md">
                                        1.Họ và tên nhân viên:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {employeeData?.name}
                                    </span>
                                </Grid>
                                <Grid item xs={4} className="flex">
                                    <span className="text-md">
                                        2. Giới tính:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {GENDER[employeeData?.gender]?.name}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid xs={12} className="flex">
                                <span className="text-md">
                                    3. Ngày sinh:
                                </span>
                                <span className="underline__dotted text-md detail-content">
                                    {moment(new Date(employeeData?.dateOfBirth)).format(
                                        "DD/MM/YYYY"
                                    )}
                                </span>
                            </Grid>
                            <Grid xs={12} className="flex">
                                <span className="text-md">
                                    4. Hộ khẩu thường trú:
                                </span>
                                <span className="underline__dotted text-md detail-content">
                                    {employeeData?.address}
                                </span>
                            </Grid>
                            <Grid xs={12} className="flex">
                                <span className="text-md">
                                    5. Điên thoại liên lạc:
                                </span>
                                <span className="underline__dotted text-md detail-content">{employeeData?.phone}</span>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={6} className="flex">
                                    <span className="text-md">
                                        6.Dân tộc:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {employeeData?.ethnic}
                                    </span>
                                </Grid>
                                <Grid item md={6} xs={12} className="flex">
                                    <span className="text-md">
                                        7. Tôn giáo:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {employeeData?.religion ? employeeData?.religion : "Không"}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={6} className="flex">
                                    <span className="text-md">
                                        8. Căn cước công dân:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {employeeData?.citizenIdentificationNumber}
                                    </span>
                                </Grid>
                                <Grid item xs={12} md={6} className="flex">
                                    <span className="text-md">
                                        9. Ngày cấp:
                                    </span>
                                    <span className="underline__dotted text-md detail-content">
                                        {moment(employeeData?.dateOfIssuanceCard).format("DD/MM/YYYY")}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid xs={12} className="flex">
                                <span className="text-md">
                                    10. Nơi cấp:
                                </span>
                                <span className="underline__dotted text-md detail-content">
                                    {employeeData?.placeOfIssueCard}
                                </span>
                            </Grid>
                        </div>
                    </Box>

                    {/* TT gia ding */}
                    <Box className="body-profile">
                        <h4 className="header-text">II. Thông tin gia đình</h4>
                        <TableContainer>
                            <Table border="1">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" width="6%" className="table-head">
                                            STT
                                        </TableCell>
                                        <TableCell align="center" width="20%" className="table-head">
                                            Tên người thân
                                        </TableCell>
                                        <TableCell align="center" width="12%" className="table-head">
                                            Ngày sinh
                                        </TableCell>
                                        <TableCell align="center" width="12%" className="table-head">
                                            Quan hệ
                                        </TableCell>
                                        <TableCell align="center" width="14%" className="table-head">
                                            SĐT
                                        </TableCell>
                                        <TableCell align="center" width="16%" className="table-head">
                                            Số CCCD
                                        </TableCell>
                                        <TableCell align="center" width="20%" className="table-head">
                                            Địa chỉ
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {family.length > 0
                                        ? family?.map((family, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left" className="table-body">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left" className="table-body text-overflow">
                                                    {family?.name}
                                                </TableCell>
                                                <TableCell align="left" className="table-body">
                                                    {moment(new Date(family?.dateOfBirth)).format(
                                                        "DD/MM/YYYY"
                                                    )}
                                                </TableCell>
                                                <TableCell align="left" className="table-body">
                                                    {RELATIONSHIP[family?.relationShip]?.name}
                                                </TableCell>
                                                <TableCell align="left" className="table-body">
                                                    {family?.phoneNumber}
                                                </TableCell>
                                                <TableCell align="left" className="table-body">
                                                    {family?.citizenIdentificationNumber}
                                                </TableCell>
                                                <TableCell align="left" className="table-body text-overflow">
                                                    {family?.address}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        : (
                                            <TableRow>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                                <TableCell align="left" className="table-body"></TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
                {/* loi cam doan */}
                <div className="vitae-footer">
                    <Box>
                        <h4 className="header-text">III. Lời cam đoan</h4>
                        <p className="text-md">
                            Tôi xin cam đoan bản khai sơ yếu lý lịch trên là đúng sự thật, nếu
                            có điều gì không đúng tôi xin chịu trách nhiệm trước pháp luật về
                            lời khai của mình.
                        </p>
                        <Box className="footer-container">
                            <div className="footer-date">
                                <div className="vitae-date">
                                    <span className="vitae-place text-md">Hà Nội</span>,
                                    <div className="type-date">
                                        <span className="vitae-place text-md"> ngày</span>
                                        <span className="type-content text-md underline__dotted">
                                            {employeeData?.submitDay &&
                                                moment(employeeData?.submitDay).format("DD/MM/YYYY").split("/")[0]}
                                        </span>
                                    </div>
                                    <div className="type-date">
                                        <span className="vitae-place text-md">tháng</span>
                                        <span className="type-content text-md underline__dotted">
                                            {employeeData?.submitDay &&
                                                moment(employeeData?.submitDay).format("DD/MM/YYYY").split("/")[1]}
                                        </span>
                                    </div>
                                    <div className="type-date">
                                        <span className="vitae-place text-md">năm</span>
                                        <span className="type-content text-md underline__dotted">
                                            {employeeData?.submitDay &&
                                                moment(employeeData?.submitDay).format("DD/MM/YYYY").split("/")[2]}
                                        </span>
                                    </div>
                                </div>
                                <h4 className="header-text footer-label">Người khai</h4>
                                <span className="footer-notify">(Kí và ghi rõ họ tên)</span>
                                <div className="footer-signature">{employeeData?.name}</div>
                            </div>
                        </Box>
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default TabCurriculumVitae;
