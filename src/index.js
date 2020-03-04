/* eslint-disable camelcase */
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	BaseControl,
	Button,
	ExternalLink,
	PanelBody,
	PanelRow,
	Placeholder,
	Spinner,
	ToggleControl
} = wp.components;

const {
	render,
	Component,
	Fragment
} = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';

class App extends Component {
	constructor() {
		super( ...arguments );

		this.changeOptions = this.changeOptions.bind( this );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			codeinwp_analytics_status: false,
			codeinwp_analytics_key: ''
		};
	}

	async componentDidMount() {
		wp.api.loadPromise.then( () => {
			this.settings = new wp.api.models.Settings();

			if ( false === this.state.isAPILoaded ) {
				this.settings.fetch().then( response => {
					this.setState({
						codeinwp_analytics_status: Boolean( response.codeinwp_analytics_status ),
						codeinwp_analytics_key: response.codeinwp_analytics_key,
						isAPILoaded: true
					});
				});
			}
		});
	}

	changeOptions( option, value ) {
		this.setState({ isAPISaving: true });

		const model = new wp.api.models.Settings({
			// eslint-disable-next-line camelcase
			[option]: value
		});

		model.save().then( response => {
			this.setState({
				[option]: response[option],
				isAPISaving: false
			});
		});
	}

	render() {
		if ( ! this.state.isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner/>
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="codeinwp-header">
					<div className="codeinwp-container">
						<div className="codeinwp-logo">
							<h1>{ __( 'My Awesome Plugin' ) }</h1>
						</div>
					</div>
				</div>

				<div className="codeinwp-main">
					<PanelBody
						title={ __( 'Settings' ) }
					>
						<PanelRow>
							<BaseControl
								label={ __( 'Google Analytics Key' ) }
								help={ 'In order to use Google Analytics, you need to use an API key.' }
								id="codeinwp-options-google-analytics-api"
								className="codeinwp-text-field"
							>
								<input
									type="text"
									id="codeinwp-options-google-analytics-api"
									value={ this.state.codeinwp_analytics_key }
									placeholder={ __( 'Google Analytics API Key' ) }
									disabled={ this.state.isAPISaving }
									onChange={ e => this.setState({ codeinwp_analytics_key: e.target.value }) }
								/>

								<div className="codeinwp-text-field-button-group">
									<Button
										isPrimary
										isLarge
										disabled={ this.state.isAPISaving }
										onClick={ () => this.changeOptions( 'codeinwp_analytics_key', this.state.codeinwp_analytics_key ) }
									>
										{ __( 'Save' ) }
									</Button>

									<ExternalLink href="#">
										{ __( 'Get API Key' ) }
									</ExternalLink>
								</div>
							</BaseControl>
						</PanelRow>

						<PanelRow>
							<ToggleControl
								label={ __( 'Track Admin Users?' ) }
								help={ 'Would you like to track views of logged-in admin accounts?.' }
								checked={ this.state.codeinwp_analytics_status }
								onChange={ () => this.changeOptions( 'codeinwp_analytics_status', ! this.state.codeinwp_analytics_status ) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody>
						<div className="codeinwp-info">
							<h2>{ __( 'Got a question for us?' ) }</h2>

							<p>{ __( 'We would love to help you out if you need any help.' ) }</p>

							<div className="codeinwp-info-button-group">
								<Button
									isDefault
									isLarge
									target="_blank"
									href="#"
								>
									{ __( 'Ask a question' ) }
								</Button>

								<Button
									isDefault
									isLarge
									target="_blank"
									href="#"
								>
									{ __( 'Leave a review' ) }
								</Button>
							</div>
						</div>
					</PanelBody>
				</div>
			</Fragment>
		);
	}
}

render(
	<App/>,
	document.getElementById( 'codeinwp-awesome-plugin' )
);
