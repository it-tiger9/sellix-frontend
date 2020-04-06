import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	Card,
	CardHeader,
	CardBody,
	Button,
	Row,
	Col,
	FormGroup,
	Form,
	Label,
	Tooltip,
	Input
} from 'reactstrap'
import Select from 'react-select'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AppSwitch } from '@coreui/react'
import { Loader, ImageUpload, DataSlider, Spin } from 'components'
import * as ProductActions from '../../actions'
import { Formik } from 'formik';
import * as Yup from "yup";
import config from 'constants/config'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { CommonActions } from 'services/global'

import './style.scss'

import bitcoinIcon from 'assets/images/crypto/btc.svg'
import ethereumIcon from 'assets/images/crypto/eth.svg'
import stripeIcon from 'assets/images/crypto/stripe.svg'
import bitcoinCashIcon from 'assets/images/crypto/bitcoincash.svg'
import litecoinIcon from 'assets/images/crypto/ltc.svg'
import skrillIcon from 'assets/images/crypto/skrill.svg'
import perfectmoneyIcon from 'assets/images/crypto/perfectmoney.svg'


const mapDispatchToProps = (dispatch) => {
	return ({
		commonActions: bindActionCreators(CommonActions, dispatch),
		actions: bindActionCreators(ProductActions, dispatch)
	})
}


const TYPE_OPTIONS = [
	{ value: 'file', label: 'File' },
	{ value: 'serials', label: 'Serials' },
	{ value: 'service', label: 'Service' },
]

const DELIMITER_OPTIONIS = [
	{ value: 'comma', label: 'Comma' },
	{ value: 'newline', label: 'New Line' },
	{ value: 'custom', label: 'Custom' }
]

const CUSTOM_TYPE = [
	{ value: 'number', label: 'Number' },
	{ value: 'text', label: 'Text' },
	{ value: 'hidden', label: 'Hidden' },
	{ value: 'largetextbox', label: 'Large Textbox' },
	{ value: 'checkbox', label: 'Checkbox' },
]

const CURRENCY_LIST = [
	{ value: 'USD', label: 'USD'},
	{ value: 'EUR', label: 'EUR'},
	{ value: 'JPY', label: 'JPY'},
	{ value: 'GBP', label: 'GBP'},
	{ value: 'AUD', label: 'AUD'},
	{ value: 'CAD', label: 'CAD'},
	{ value: 'CHF', label: 'CHF'},
	{ value: 'CNY', label: 'CNY'},
	{ value: 'SEK', label: 'SEK'},
	{ value: 'NZD', label: 'NZD'}
]

const EDITOR_FORMATS = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const EDITOR_MODULES  = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
	 {'indent': '-1'}, {'indent': '+1'}],
	['link', 'image'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

class CreateProduct extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			unlistedTooltipOpen: false,
			privateTooltipOpen: false,
			blockTooltipOpen: false,
			paypalTooltipOpen: false,
			files: [],
			images: [],
			initialValues: {
				title: '',
				price: '',
				description: '',
				currency: 'USD',
				gateways: '',
				type: 'file',
				serials: '',
				service_text: '',
				file_stock: -1,
				stock_delimeter: '',
				quantity_min: 0,
				quantity_max: 0,
				delivery_text: '',
				custom_fields: [],
				crypto_confirmations: 0,
				max_risk_level: 0,
				unlisted: 0,
				private: 0,
				block_vpn_proxies: 0,
				sort_priority: 1,
				image: null,
				file: null
			},
			showFileStock: false,
			gateways: {},
			type: TYPE_OPTIONS[0],
			delimiter: DELIMITER_OPTIONIS[0],
			custom_fields: []
		}

		this.addCustomField = this.addCustomField.bind(this)
		this.deleteCustomField = this.deleteCustomField.bind(this)
		this.saveCustomField = this.saveCustomField.bind(this)
	}

	componentWillUnmount() {
		// Make sure to revoke the data uris to avoid memory leaks
		this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
	}

	unlistedTooltipToggle() {
		this.setState({unlistedTooltipOpen: !this.state.unlistedTooltipOpen})
	}

	privateTooltipToggle() {
		this.setState({privateTooltipOpen: !this.state.privateTooltipOpen})
	}

	blockTooltipToggle() {
		this.setState({blockTooltipOpen: !this.state.blockTooltipOpen})
	}

	paypalTooltipToggle() {
		this.setState({paypalTooltipOpen: !this.state.paypalTooltipOpen})
	}


	addFile = file => {
		this.setState({
			files: file.map(file =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			)
		});
	};

	addImages = image => {
		this.setState({
			images: image.map(image =>
				Object.assign(image, {
					preview: URL.createObjectURL(image)
				})
			)
		});
	};


	/**  Custom Fields **/

	addCustomField() {
		const custom_fields = Object.assign([], this.state.custom_fields)
		custom_fields.push({name: '', type: CUSTOM_TYPE[0], required: false})

		this.setState({custom_fields: custom_fields})
	}

	deleteCustomField(e, index) {
		const custom_fields = Object.assign([], this.state.custom_fields)
		custom_fields.splice(index, 1)

		this.setState({custom_fields: custom_fields})
	}

	saveCustomField(value, index, field) {
		const custom_fields = Object.assign([], this.state.custom_fields)
		custom_fields[index][field] = value

		this.setState({custom_fields: custom_fields})
	}


	handleSubmit(values) {
		this.setState({loading: true})
		const { gateways, custom_fields, showFileStock } = this.state
		delete gateways['']
		values.gateways = Object.keys(gateways).filter(key => { return gateways[key]}).toString()
		values.custom_fields = JSON.stringify({
			custom_fields: custom_fields.map(field => { return {...field, type: field.type.value}})
		})
		values.file_stock = showFileStock?values.file_stock:-1

		this.props.actions.createProduct(values).then(res => {
			this.props.commonActions.tostifyAlert('success', res.message)
			this.props.history.goBack()
		}).catch(err => {
			this.props.commonActions.tostifyAlert('error', err.error)
		}).finally(() => {
			this.setState({loading: false})
		})
	}

	setGateWays(value, isChecked) {
		this.setState({
			gateways: {...this.state.gateways, [value]:isChecked}
		})
	}

	render() {
		const { 
			loading, 
			unlistedTooltipOpen, 
			privateTooltipOpen,
			blockTooltipOpen,
			paypalTooltipOpen,
			files, 
			images,
			showFileStock,
			editorState,
			initialValues,
			type,
			delimiter,
			custom_fields
		} = this.state

		return (
			<div className="create-product-screen mt-3">
				<div className="animated fadeIn">

					<Breadcrumb className="mb-0">
						<BreadcrumbItem active className="mb-0">
							<a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Products</a>
						</BreadcrumbItem>
					</Breadcrumb>

					<Formik
							initialValues={initialValues}
							onSubmit={(values) => {
								this.handleSubmit(values)
							}}
							validationSchema={Yup.object().shape({
								title: Yup.string().required('Title is required'),
								price: Yup.number().required('Price is required'),
								description: Yup.string().required('Description is required'),
								currency: Yup.string().required('Currency is required'),
								type: Yup.string(),
								custom_fields: Yup.string(),
								gateways: Yup.string(),
								serials: Yup.string(),
								service_text: Yup.string(),
								file_stock: Yup.number(),
								quantity_min: Yup.number(),
								quantity_max: Yup.number(),
								stock_delimeter: Yup.string(),
								delivery_text: Yup.string(),
								crypto_confirmations: Yup.number(),
								max_risk_level: Yup.number(),
								unlisted: Yup.number(),
								private: Yup.number(),
								block_vpn_proxies: Yup.number(),
								sort_priority: Yup.number(),
							})}>
								{props => (
									<Form onSubmit={props.handleSubmit}>
										<Card>

											<CardHeader>
												<Row style={{alignItems: 'center'}}>
													<Col md={12}>
														<h1>New Product</h1>
													</Col>
												</Row>
											</CardHeader>

											<CardBody className="p-4 mb-5">
												{
													loading ?
														<Row>
															<Col lg={12}>
																<Loader />
															</Col>
														</Row>
													:
														<Row className="mt-4 mb-4">
															<Col lg={12}>
																<Row>
																	<Col lg={12}>
																		<h4 className="mb-4">General Information</h4>
																	</Col>
																</Row>
																<Row>
																	<Col lg={8}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="title">Title</Label>
																			<Input
																				type="text"
																				id="title"
																				name="title"
																				placeholder="Title"
																				onChange={props.handleChange}
																				value={props.values.title}
																				className={
																					props.errors.title && props.touched.title
																						? "is-invalid"
																						: ""
																				}
																			/>
																			{props.errors.title && props.touched.title && (
																				<div className="invalid-feedback">{props.errors.title}</div>
																			)}
																		</FormGroup>
																	</Col>
																	<Col lg={4}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="price">Price</Label>
																			<div className="d-flex">
																				<div>
																					<Input
																						className={"price-select " + props.errors.price && props.touched.price ? "is-invalid" : ""}
																						style={{
																							paddingRight: "110px",
																							width: "calc(100% + 90px)"
																						}}
																						type="number"
																						id="price"
																						step="0.01"
																						name="price"
																						placeholder="Price"
																						onChange={props.handleChange}
																						value={props.values.price}
																					/>
																					{props.errors.price && props.touched.price && (
																						<div className="invalid-feedback">{props.errors.price}</div>
																					)}
																				</div>
																				<div style={{marginLeft: -10}}>
																				<Select
																					className="currency-select"
																					options={CURRENCY_LIST}
																					id="currency"
																					name="currency"
																					placeholder="USD"
																					value={props.values.currency}
																					onChange={(option) => {
																						props.handleChange("currency")(option.value);
																					}}
																					searchable={false}
																					className={
																						props.errors.currency && props.touched.currency
																							? "is-invalid currency-select"
																							: "currency-select"
																					}
																				/>
																				{props.errors.products_bound && props.touched.products_bound && (
																					<div className="invalid-feedback">{props.errors.products_bound}</div>
																				)}
																				</div>
																			</div>
																		</FormGroup>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="description">Description</Label>
																			<div className={
																						props.errors.description && props.touched.description
																							? "is-invalid"
																							: ""
																					}>
																				<ReactQuill value={props.values.description}
																					modules={EDITOR_MODULES}
																					formats={EDITOR_FORMATS}
																					placeholder={''}
																					bounds={'.app'}
																					onChange={(value) => {
																						props.handleChange('description')(value)
																					}} 
																				/>
																			</div>
																			{props.errors.description && props.touched.description && (
																				<div className="invalid-feedback">{props.errors.description}</div>
																			)}
																		</FormGroup>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12}>
																		<FormGroup className="mb-3 mr-4">
																			<Label htmlFor="product_code">Payment Methods</Label>

																			<div className="d-flex flex-wrap">
																				<label className="custom-checkbox custom-control payment-checkbox ">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="paypal"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('paypal', e.target.checked)
																						}}
																					/>
																					<label className="custom-control-label" htmlFor="paypal">
																						<i className="fa fa-paypal" />
																						PayPal
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="btc"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('bitcoin', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="btc">
																						<img src={bitcoinIcon} width="20" height="20"/>
																						Bitcoin
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="eth"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('ethereum', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="eth">
																						<img src={ethereumIcon} width="20" height="20"/>
																						Ethereum
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="ltc"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('litecoin', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="ltc">
																						<img src={litecoinIcon} width="20" height="20"/>
																						Litecoin
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="sp"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('stripe', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="sp">
																						<img src={stripeIcon} width="20" height="20"/>
																						Stripe
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="pm"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('perfectmoney', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="pm">
																						<img src={perfectmoneyIcon} width="20" height="20"/>
																						Perfect Money
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="btcc"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('bitcoincash', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="btcc">
																						<img src={bitcoinCashIcon} width="20" height="20"/>
																						Bitcoin Cash
																					</label>
																				</label>

																				<label className="custom-checkbox custom-control payment-checkbox">
																					<input 
																						className="custom-control-input"
																						type="checkbox"
																						id="sk"
																						name="SMTP-auth"
																						onChange={(e) => {
																							this.setGateWays('skrill', e.target.checked)
																						}}
																						/>
																					<label className="custom-control-label" htmlFor="sk">
																						<img src={skrillIcon} width="20" height="20"/>
																						Skrill
																					</label>
																				</label>
																			</div>
																		</FormGroup>
																	</Col>
																</Row>
																<hr className="mt-4"/>

																<Row>
																	<Col lg={12}>
																		<h4 className="mb-4 mt-4">Product Stock</h4>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="product_code">Type</Label>
																			<Select 
																				placeholder="Type" 
																				options={TYPE_OPTIONS} 
																				className="mb-3"
																				value={this.state.type}
																				searchable={false}
																				onChange={(option) => {
																					this.setState({
																						type: option
																					})
	
																					props.handleChange("type")(option.value);
																				}}>                                       
																			</Select>
																		</FormGroup>
																	</Col>
																</Row>
																{type.value === 'file' && <Row>
																	<Col lg={12} className="mb-3">
																		<ImageUpload addFile={(file) => {
																			props.handleChange('file')(file[0]); 
																			this.addFile(file)}} files={files}/>
																	</Col>
																	<Col lg={12}>
																		<FormGroup row>
																			<Col xs="12" md="7" className="d-flex align-items-center">
																				<AppSwitch className="mx-1 file-switch mr-2"
																					style={{width: 50}}
																					variant={'pill'} 
																					color={'primary'}
																					checked={showFileStock}
																					onChange={(e) => {
																						this.setState({
																							showFileStock: e.target.checked
																						})
																					}}
																					size="sm"
																					/><span>Set how many this file can be sold </span>
																			</Col>
																		</FormGroup>
																	</Col>
																</Row>}

																{showFileStock && type.value === 'file' && <Row>
																	<Col lg={4}>
																		<FormGroup>
																			<Label htmlFor="product_code">Stock Amount <small className="font-italic">(leave <b>-1</b> for unlimited times)</small></Label>
																			<Input type="number" id="file_stock" name="file_stock"
																				min={-1}
																				value={props.values.file_stock}
																				onChange={props.handleChange}/>
																		</FormGroup>
																	</Col>
																</Row>}

																{type.value === 'serials' && <div><Row>
																		<Col lg={12} className="mb-3">
																			<textarea className="form-control" rows={5}></textarea>
																		</Col>
																	</Row>
																	<Row>
																		<Col lg={3}>
																			<FormGroup className="mb-3">
																				<Label htmlFor="product_code">Stock Delimiter</Label>
																				<Select 
																					placeholder="Type" 
																					options={DELIMITER_OPTIONIS}
																					searchable={false}
																					className="mb-3"
																					value={this.state.delimiter}
																					onChange={(option) => {
																						this.setState({
																							delimiter: option
																						})
																						
																						if(option.value !== 'custom')
																							props.handleChange("stock_delimeter")(option.value)
																						else props.handleChange("stock_delimeter")('')
																					}}>                                       
																				</Select>
																			</FormGroup>
																		</Col>
																		{ delimiter.value === 'custom' && 
																			<Col lg={3}>
																				<FormGroup className="mb-3">
																					<Label htmlFor="product_code">Custom Stock Delimiter</Label>
																					<Input type="text"
																						id="stock_delimeter"
																						name="stock_delimeter"
																						value={props.values.stock_delimeter}
																						onChange={props.handleChange}
																					></Input>
																				</FormGroup>
																			</Col>
																		}
																		<Col lg={3}>
																			<FormGroup className="mb-3">
																				<Label htmlFor="product_code">Minimum Quantity</Label>
																				<Input type="number"
																					id="quantity_min"
																					min={0}
																					name="quantity_min"
																					value={props.values.quantity_min}
																					onChange={props.handleChange}
																				></Input>
																			</FormGroup>
																		</Col>
																		<Col lg={3}>
																			<FormGroup className="mb-3">
																				<Label htmlFor="product_code">Maximum Quantity</Label>
																				<Input type="number"
																					id="quantity_max"
																					min={1}
																					name="quantity_max"
																					value={props.values.quantity_max}
																					onChange={props.handleChange}
																				></Input>
																			</FormGroup>
																		</Col>
																</Row></div>}

																{type.value === 'service' && <Row>
																	<Col lg={12}>
																		<FormGroup>
																			<Label htmlFor="product_code">Service Into</Label>
																			<textarea className="form-control" 
																				id='service_text'
																				name="service_text"
																				value={props.values.service_text}
																				rows={5} onChange={props.handleChange}></textarea>
																		</FormGroup>
																	</Col>
																</Row>}
																

																<hr className="mt-4"/>
																<Row>
																	<Col lg={12}>
																		<h4 className="mb-4 mt-4">Customization</h4>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="product_code">Image <small className="font-italic">(optional)</small></Label>
																			<ImageUpload addFile={(file) => {
																			props.handleChange('image')(file[0]); 
																			this.addImages(file)}} files={images}/>
																		</FormGroup>
																		<FormGroup className="mb-3">
																			<Label htmlFor="product_code">Note to Customer <small className="font-italic">(optional)</small></Label>
																			<Input
																				type="text"
																				id="delivery_text"
																				name="delivery_text"
																				placeholder="Note to Customer"
																				value={props.values.delivery_text}
																				onChange={props.handleChange}
																			/>
																		</FormGroup>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12}>
																		<FormGroup className="mb-0">
																			<Label htmlFor="product_code" style={{width: '100%'}}>Custom Fields <small className="font-italic">(optional)</small></Label>
																		</FormGroup>
																	</Col>

																	{
																		custom_fields.map((field, index) => {
																			return(
																				<Col lg={12} key={index}>
																					<Row>
																						<Col lg={4}>
																							<FormGroup className="mb-3">
																								<Label htmlFor="product_code" style={{width: '100%', fontSize: 13}}>Name</Label>
																								<Input type="text" value={field.name} onChange={(e) => {
																									this.saveCustomField(e.target.value, index, 'name')
																								}}/>
																							</FormGroup>
																						</Col>
																						<Col lg={4}>
																							<FormGroup className="mb-3">
																								<Label htmlFor="product_code" style={{width: '100%', fontSize: 13}}>Type</Label>
																								<Select options={CUSTOM_TYPE} 
																									value={field.type}
																									    searchable={false}
																									onChange={(option) => {
																										this.saveCustomField(option, index, 'type')
																									}}
																								/>
																							</FormGroup>
																						</Col>
																						<Col lg={3}>																						
																							<FormGroup className="mb-3">
																								<Label htmlFor="product_code" style={{width: '100%', fontSize: 13}}>Required</Label>
																								<div className="d-flex align-items-center mt-2">
																									<AppSwitch className="mx-1 file-switch mr-3"
																										style={{width: 50, marginTop: 10}}
																										variant={'pill'} 
																										color={'primary'}
																										checked={field.required}
																										onChange={(e) => {
																											this.saveCustomField(e.target.checked, index, 'required')
																										}}
																										size="sm"/>
																									<a onClick={(e) => this.deleteCustomField(e, index)} style={{fontSize: 20}}>
																										<i className="fas fa-trash"/></a>
																								</div>
																							</FormGroup>
																						</Col>
																					</Row>
																				</Col>
																			)
																		})
																	}
																	
																	<Col lg={12}>
																		<FormGroup className="mb-3">
																			<Button color="default" onClick={this.addCustomField}>Add Custom Field</Button>
																		</FormGroup>
																	</Col>
																</Row>
													
																<hr className="mt-4"/>
																<Row>
																	<Col lg={12}>
																		<h4 className="mb-4 mt-4">Miscellaneous</h4>
																	</Col>
																</Row>
																
																<Row>
																	<Col lg={6}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="product_code">Crypto Currency Confirmations</Label>
																			<DataSlider 
																				domain={[0, 6]} 
																				value={[props.values.crypto_confirmations]} 
																				ticks={[0, 1, 2, 3, 4, 5, 6]}
																				receiveValue = {(value) => {
																					props.handleChange('crypto_confirmations')(value)
																				}}
																			/>
																		</FormGroup>
																	</Col>
																	<Col lg={6}>
																		<FormGroup className="mb-3">
																			<Label htmlFor="product_code">Max Risk Level</Label>
																			<DataSlider 
																				domain={[0, 100]} 
																				value={[props.values.max_risk_level]} 
																				ticks={[1, 50, 100]}
																				receiveValue = {(value) => {
																					props.handleChange('max_risk_level')(value)
																				}}/>
																		</FormGroup>
																	</Col>
																</Row>
																<Row>
																	<Col lg={12} className="d-flex flex-wrap">
																		<FormGroup check inline className="mb-3 mr-4">
																			<div className="custom-checkbox custom-control">
																				<input 
																					className="custom-control-input"
																					type="checkbox"
																					id="unlisted"
																					name="SMTP-auth"
																					checked={props.values.unlisted == 1?true:false}
																					onChange={(e) => {
																						props.handleChange('unlisted')(e.target.checked?1:0)
																					}}
																				/>
																				<label className="custom-control-label" htmlFor="unlisted">
																					Unlisted &nbsp;
																					<span href="#" id="unlistedTooltip"><i className="fa fa-question-circle"></i></span>
																					<Tooltip placement="right" isOpen={unlistedTooltipOpen} target="unlistedTooltip" 
																						toggle={this.unlistedTooltipToggle.bind(this)}>
																						The product wont be displayed on your Shop, but can still be accessed via direct URL.
																					</Tooltip>
																				</label>
																			</div>
																		</FormGroup>
																		<FormGroup check inline className="mb-3 mr-4">
																			<div className="custom-checkbox custom-control">
																				<input 
																					className="custom-control-input"
																					type="checkbox"
																					id="private"
																					name="SMTP-auth"
																					checked={props.values.private == 1?true:false}
																					onChange={(e) => {
																						props.handleChange('private')(e.target.checked?1:0)
																					}}
																					/>
																				<label className="custom-control-label" htmlFor="private">
																					Private &nbsp;
																					<span href="#" id="privateTooltip"><i className="fa fa-question-circle"></i></span>
																					<Tooltip placement="right" isOpen={privateTooltipOpen} target="privateTooltip" 
																						toggle={this.privateTooltipToggle.bind(this)}>
																						Only you can access this product
																					</Tooltip>
																				</label>
																			</div>
																		</FormGroup>
																		<FormGroup check inline className="mb-3 mr-4">
																			<div className="custom-checkbox custom-control">
																				<input 
																					className="custom-control-input"
																					type="checkbox"
																					id="block"
																					name="SMTP-auth"
																					checked={props.values.block_vpn_proxies == 1?true:false}
																					onChange={(e) => {
																						props.handleChange('block_vpn_proxies')(e.target.checked?1:0)
																					}}
																					/>
																				<label className="custom-control-label" htmlFor="block">
																					Block VPNs/Proxies &nbsp;
																					<span href="#" id="blockTooltip"><i className="fa fa-question-circle"></i></span>
																					<Tooltip placement="right" isOpen={blockTooltipOpen} target="blockTooltip" 
																						toggle={this.blockTooltipToggle.bind(this)}>
																						Block VPNs/Proxies
																					</Tooltip>
																				</label>
																			</div>
																		</FormGroup>
																		<FormGroup check inline className="mb-3 mr-4">
																			<div className="custom-checkbox custom-control">
																				<input 
																					className="custom-control-input"
																					type="checkbox"
																					id="paypal-email"
																					name="SMTP-auth"
																					/>
																				
																			</div>
																		</FormGroup>
																	</Col>
																</Row>
															</Col>
														</Row>
												}
											</CardBody>

											<Button color="primary" type="submit" className="" style={{width: 200}}>
												Save Product
											</Button>
											
										</Card>
									</Form> )}
							</Formik>
				</div>
			</div>
		)
	}
}

export default connect(null, mapDispatchToProps)(CreateProduct)
