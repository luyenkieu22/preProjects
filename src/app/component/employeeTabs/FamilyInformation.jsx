import { Button, Grid, Icon, IconButton, MenuItem } from '@material-ui/core'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { SelectValidator, TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import CustomTable from '../CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { useConfirm } from '../useConfirm'
import { addFamilyAction, deleteFamilyAction, editFamilyAction, getFamilyByEmployeeIdAction } from 'app/redux/actions/familyAction'
import { GENDER, RELATIONSHIP } from 'app/const/statusEmployee'
import { regexAddress, regexName } from 'app/const/regex'

const FamilyInformation = ({ employee }) => {
    const { family, isLoading } = useSelector(state => state.family)
    const dispatch = useDispatch()
    const [DialogConfirm, confirm] = useConfirm(
        "Xác nhận xóa",
        "Bạn có chắc chắn muốn xóa người thân này?"
    )

    const [familyObject, setFamilyObject] = useState({
        id: "",
        name: "",
        gender: "",
        dateOfBirth: "",
        relationShip: "",
        citizenIdentificationNumber: "",
        address: "",
        email: "",
        phoneNumber: ""
    })

    const fetchFamily = useCallback(() => {
        dispatch(getFamilyByEmployeeIdAction(employee?.id));
    }, [dispatch, employee.id]);

    useEffect(() => {
        fetchFamily()
    }, [fetchFamily, isLoading])

    const handleChangeValue = (e) => {
        const { name, value } = e.target
        setFamilyObject({ ...familyObject, [name]: value })
    }

    const handleCancel = () => {
        setFamilyObject({
            id: "",
            name: "",
            gender: "",
            dateOfBirth: "",
            relationShip: "",
            citizenIdentificationNumber: "",
            address: "",
            email: "",
            phoneNumber: ""
        })
    }

    const handleClickEdit = (data) => {
        setFamilyObject(data)
    }

    const handleDelete = async id => {
        const ok = await confirm()
        if (!ok) return;
        dispatch(deleteFamilyAction(id))
    }

    const handleSubmit = () => {
        if (familyObject?.id) {
            dispatch(editFamilyAction(familyObject))
        } else {
            dispatch(addFamilyAction(familyObject, employee?.id))
        }
        handleCancel()
    }

    useEffect(() => {
        ValidatorForm.addValidationRule("citizenIdentificationNumberValidator", (value) => {
            return value?.length === 12
        })

        return () => {
            ValidatorForm.removeValidationRule("citizenIdentificationNumberValidator")
        }
    }, [])


    const columns = [
        {
            title: "Thao tác",
            field: "custom",
            align: "center",
            minWidth: "120px",
            maxWidth: "120px",
            render: (rowData) => {
                return (
                    <div className="">
                        <IconButton size="small" onClick={() => handleClickEdit(rowData)}>
                            <Icon fontSize="small" color="primary">
                                edit
                            </Icon>
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(rowData.id)}>
                            <Icon fontSize="small" color="error">
                                delete
                            </Icon>
                        </IconButton>
                    </div>
                );
            },
        },
        {
            title: "Tên người thân",
            field: "name",
            align: "left",
            minWidth: "160px",
        },
        {
            title: "Ngày sinh",
            field: "dateOfBirth",
            align: "center",
            minWidth: "120px",
            maxWidth: "120px",
            render: (rowData) => <span>
                {moment(rowData?.dateOfBirth).format("DD/MM/YYYY")}
            </span>,
        },
        {
            title: "Giới tính",
            field: "gender",
            align: "center",
            minWidth: "100px",
            maxWidth: "120px",
            render: (rowData) => <span>{`${GENDER[rowData?.gender].name}`}</span>,
        },
        {
            title: "Quan hệ",
            field: "relationShip",
            align: "left",
            minWidth: "130px",
            render: (rowData) => <span>{`${RELATIONSHIP[rowData?.relationShip].name}`}</span>,
        },
        {
            title: "Số CCCD",
            field: "citizenIdentificationNumber",
            align: "left",
            minWidth: "140px",
        },
        {
            title: "SĐT",
            field: "phoneNumber",
            align: "left",
            minWidth: "120px"
        },
        {
            title: "Email",
            field: "email",
            align: "left",
            minWidth: "140px"
        },
        {
            title: "Địa chỉ",
            field: "address",
            align: "left",
            minWidth: "160px"
        },
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
                                    Tên người thân
                                </span>
                            }
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="name"
                            value={familyObject?.name}
                            validators={["required", `matchRegexp:${regexName}`]}
                            errorMessages={[
                                "Tên người thân không được để trống",
                                "Tên người thân không được chứa các ký tự đặc biệt và các chữ số",
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    SĐT
                                </span>
                            }
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="number"
                            name="phoneNumber"
                            value={familyObject?.phoneNumber}
                            validators={[
                                "required",
                                "matchRegexp:^(03|05|07|08|09)\\d{8}$|^\\+84(3|5|7|8|9)\\d{8}$",
                            ]}
                            errorMessages={[
                                "Số điện thoại không được để trống",
                                "Số điện thoại không đúng",
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Email
                                </span>
                            }
                            fullWidth
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="email"
                            value={familyObject?.email}
                            validators={["required", "isEmail"]}
                            errorMessages={[
                                "Email không được để trống",
                                "Email sai định dạng"
                            ]}
                        />
                    </Grid>

                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className="stylePlaceholder"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Ngày sinh
                                </span>
                            }
                            onChange={handleChangeValue}
                            type="date"
                            name="dateOfBirth"
                            value={
                                familyObject?.dateOfBirth
                                    ? moment(familyObject?.dateOfBirth).format("YYYY-MM-DD")
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
                                "Ngày sinh không được để trống",
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <SelectValidator
                            className="w-100 stylePlaceholder"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Giới tính
                                </span>
                            }
                            variant="outlined"
                            type="text"
                            name="gender"
                            value={familyObject?.gender}
                            onChange={handleChangeValue}
                            validators={["required"]}
                            errorMessages={["Giới tính không được để trống"]}
                        >
                            {GENDER.map(gender => (
                                <MenuItem value={gender.id + 1}>{gender.name}</MenuItem>

                            ))}
                        </SelectValidator>
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <SelectValidator
                            className="w-100 stylePlaceholder"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Quan hệ
                                </span>}
                            variant="outlined"
                            type="text"
                            name="relationShip"
                            value={familyObject?.relationShip}
                            onChange={handleChangeValue}
                            validators={["required"]}
                            errorMessages={["Quan hệ không được để trống"]}
                        >
                            {RELATIONSHIP.map(relationship => (
                                <MenuItem key={relationship.id} value={relationship.id}>
                                    {relationship.name}
                                </MenuItem>
                            ))}
                        </SelectValidator>
                    </Grid>

                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className=" stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Số CCCD
                                </span>
                            }
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="number"
                            name="citizenIdentificationNumber"
                            fullWidth
                            value={familyObject?.citizenIdentificationNumber}
                            validators={["required", "citizenIdentificationNumberValidator"]}
                            errorMessages={[
                                "CCCD không được để trống",
                                "CCCD phải đủ 12 chữ số"
                            ]}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <TextValidator
                            className=" stylePlaceholder mt-2"
                            size="small"
                            label={
                                <span style={{ color: "black" }}>
                                    <span style={{ color: "red" }}> * </span>
                                    Địa chỉ
                                </span>
                            }
                            variant="outlined"
                            onChange={handleChangeValue}
                            type="text"
                            name="address"
                            fullWidth
                            value={familyObject?.address}
                            validators={["required", `matchRegexp:${regexAddress}`]}
                            errorMessages={[
                                "Địa chỉ không được để trống",
                                "Địa chỉ không được chứa các ký tự đặc biệt",
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
                            data={family
                                ? family.map((family) => ({ ...family }))
                                : []}
                            columns={columns}
                        />
                    </Grid>
                </Grid>
            </ValidatorForm>
        </>
    )
}

export default FamilyInformation