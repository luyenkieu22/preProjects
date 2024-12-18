import {
    Box,
    makeStyles,
    Table,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import { getCertificateByEmployeeAction } from "app/redux/actions/certificatesAction";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TabCertificate = () => {
    const classes = useStyle();
    const { employee } = useSelector(state => state.employees)
    const { certificates, isLoading } = useSelector((state) => state.certificates);
    const dispatch = useDispatch()
    const fetchCertificate = useCallback(() => {
        dispatch(getCertificateByEmployeeAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchCertificate();
    }, [fetchCertificate, isLoading]);
    return (
        <Box className={classes.container}>
            <Box className={classes.boxContent}>
                <h2>I. Thông tin văn bằng</h2>
                <TableContainer>
                    <Table border="1">
                        <TableRow>
                            <TableCell
                                style={{ border: "1px solid" }}
                                align="center"
                                width="6%"
                            >
                                STT
                            </TableCell>
                            <TableCell
                                style={{ border: "1px solid" }}
                                align="center"
                                width="15%"
                            >
                                Tên văn bằng
                            </TableCell>
                            <TableCell
                                style={{ border: "1px solid" }}
                                align="center"
                                width="19%"
                            >
                                Ngày cấp
                            </TableCell>
                            <TableCell
                                style={{ border: "1px solid" }}
                                align="center"
                                width="15%"
                            >
                                Lĩnh vực
                            </TableCell>
                            <TableCell
                                style={{ border: "1px solid" }}
                                align="center"
                                width="20%"
                            >
                                Nội dung
                            </TableCell>
                        </TableRow>
                        {certificates ? (
                            certificates?.map((certificate, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        style={{ border: "1px solid", fontWeight: "normal" }}
                                        align="center"
                                    >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "1px solid", fontWeight: "normal" }}
                                        align="left"
                                    >
                                        {certificate?.certificateName}
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "1px solid", fontWeight: "normal" }}
                                        align="center"
                                    >
                                        {moment(new Date(certificate?.issueDate)).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "1px solid", fontWeight: "normal" }}
                                        align="left"
                                    >
                                        {certificate?.field}
                                    </TableCell>
                                    <TableCell
                                        style={{ border: "1px solid", fontWeight: "normal", }}
                                        align="left"
                                    >
                                        {certificate?.content}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    style={{ border: "1px solid", fontWeight: "normal" }}
                                    align="center"
                                ></TableCell>
                                <TableCell
                                    style={{ border: "1px solid", fontWeight: "normal" }}
                                    align="center"
                                ></TableCell>
                                <TableCell
                                    style={{ border: "1px solid", fontWeight: "normal" }}
                                    align="center"
                                ></TableCell>
                                <TableCell
                                    style={{ border: "1px solid", fontWeight: "normal" }}
                                    align="center"
                                ></TableCell>
                                <TableCell
                                    style={{ border: "1px solid", fontWeight: "normal" }}
                                    align="center"
                                ></TableCell>
                            </TableRow>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default TabCertificate;

const useStyle = makeStyles({
    container: {
        fontFamily: '"Times New Roman", Times, serif',
        backgroundColor: "#cccccc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    boxContent: {
        backgroundColor: "#ffff",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
    },
})