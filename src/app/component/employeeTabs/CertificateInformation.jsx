import { Button, Grid, Icon, IconButton } from '@material-ui/core'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import CustomTable from '../CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { addCertificateAction, deleteCertificateAction, editCertificateAction, getCertificateByEmployeeAction } from 'app/redux/actions/certificatesAction'
import { useConfirm } from '../useConfirm'
import { regexName } from 'app/const/regex'

const CertificateInformation = () => {
    const { employee } = useSelector(state => state.employees)
    const { certificates, isLoading } = useSelector(state => state.certificates)
    const dispatch = useDispatch()
    const [certificatesObject, setCertificatesObject] = useState({
        id: "",
        certificateName: "",
        issueDate: "",
        content: "",
        field: "",
    })
    const [DialogConfirm, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa chứng chỉ này?"
    )

    const fetchCertificates = useCallback(() => {
        dispatch(getCertificateByEmployeeAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchCertificates()
    }, [fetchCertificates, isLoading])

    const handleChangeValue = (e) => {
        const { value, name } = e.target
        setCertificatesObject({ ...certificatesObject, [name]: value })
    }

    const handleCancel = () => {
        setCertificatesObject({
            id: "",
            certificateName: "",
            issueDate: "",
            content: "",
            field: ""
        })

    }

    const handleClickEdit = (data) => {
        setCertificatesObject(data)
    }

    const handleDeleteCertificate = async (id) => {
        const ok = await confirm();
        if (!ok) return;
        dispatch(deleteCertificateAction(id))
    }

    const handleSubmit = () => {
        if (certificatesObject?.id) {
            dispatch(editCertificateAction(certificatesObject))
        } else {
            dispatch(addCertificateAction(certificatesObject, employee?.id))
        }
        handleCancel();
    }


    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            maxWidth: "100px",
            render: (rowData) => {
                return (
                    <div className="">
                        <IconButton size="small" onClick={() => handleClickEdit(rowData)}>
                            <Icon fontSize="small" color="primary">
                                edit
                            </Icon>
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteCertificate(rowData.id)}>
                            <Icon fontSize="small" color="error">
                                delete
                            </Icon>
                        </IconButton>
                    </div>
                );
            },
        },
        {
            title: "Tên chứng chỉ",
            field: "certificateName",
            align: "left",
            minWidth: "200px",
            maxWidth: "200px",
        },
        {
            title: "Ngày cấp",
            field: "issueDate",
            align: "center",
            minWidth: "100px",
            maxWidth: "100px",
            render: (data) => <span>
                {moment(data?.issueDate).format("DD/MM/YYYY")}
            </span>,
        },
        {
            title: "Lĩnh vực",
            field: "field",
            align: "center",
            minWidth: "60px",
            maxWidth: "100px",
        },
        {
            title: "Nội dung",
            field: "content",
            align: "left",
            minWidth: "160px",
        }
    ];

    return (
        <>
            <DialogConfirm />
            <ValidatorForm onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Tên chứng chỉ
                                </span>
                            }
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="certificateName"
                            value={certificatesObject.certificateName}
                            validators={["required", `matchRegexp:${regexName}`]}
                            errorMessages={[
                                "Tên chứng chỉ không được để trống",
                                "Tên chứng chỉ không chứa ký tự đặc biệt và các chữ số"
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="stylePlaceholder"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Ngày cấp
                                </span>
                            }
                            onChange={handleChangeValue}
                            type="date"
                            name="issueDate"
                            value={
                                certificatesObject?.issueDate
                                    ? moment(certificatesObject?.issueDate).format("YYYY-MM-DD")
                                    : ""
                            }
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            validators={["required"]}
                            errorMessages={[
                                "Ngày cấp không được để trống",
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className=" mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Lĩnh vực
                                </span>
                            }
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="field"
                            value={certificatesObject.field}
                            validators={["required"]}
                            errorMessages={[
                                "Lĩnh vực không được để trống"
                            ]}
                        />
                    </Grid>

                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <TextValidator
                            className=" stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Nội dung
                                </span>
                            }
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="content"
                            fullWidth
                            value={certificatesObject.content}
                            validators={["required"]}
                            errorMessages={[
                                "Nội dung không được để trống"
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <Button
                            variant="contained"
                            className="mr-12"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            className="mr-12"
                            color="primary"
                            type='submit'
                        >
                            Lưu
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            data={certificates
                                ? certificates.map((certificate) => ({ ...certificate }))
                                : []}
                            columns={columns}
                        />
                    </Grid>
                </Grid>

            </ValidatorForm>
        </>
    )
}

export default CertificateInformation