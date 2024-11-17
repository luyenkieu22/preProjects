import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableRow,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const TabCertificate = () => {
    const { certificates } = useSelector((state) => state.certificates);
    return (
        <Box>
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
                                    align="center"
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
                                    align="center"
                                >
                                    {certificate?.field}
                                </TableCell>
                                <TableCell
                                    style={{
                                        border: "1px solid",
                                        fontWeight: "normal",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                    align="center"
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
    );
};

export default TabCertificate;
