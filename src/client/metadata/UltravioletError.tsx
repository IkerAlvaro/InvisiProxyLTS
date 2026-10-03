import { SEO } from '../document-helpers.tsx';
import HeadContent from '../components/HeadContent.tsx';

export default function UltravioletErrorMetadata() {
	return (
		<>
			<title>InvisiProxy LTS | Error</title>
			<meta itemprop={'http-status'} content={'404'} />
			<SEO>
				<meta
					name={'description'}
					content={
						'Get past internet censorship today! Enjoy safer, private internet access bypassing filters such as Securly or iboss. Supports Discord and more! :D'
					}
				/>
			</SEO>
			<HeadContent />
			<link
				rel={'stylesheet'}
				href={'https://www.nerdfonts.com/assets/css/webfont.css'}
			/>
			<link
				href={
					'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
				}
				rel={'stylesheet'}
			/>
			<link
				href={
					'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
				}
				rel={'stylesheet'}
			/>
			<style
				innerHTML={
					"\n      *,\n      body {\n        color: #eceff4;\n        background-color: #1d232a;\n        font-family: 'Figtree', sans-serif;\n        font-optical-sizing: auto;\n        background-image:\n          radial-gradient(\n            circle,\n            rgba(131, 131, 131, 0.02) 1px,\n            transparent 1px\n          ),\n          radial-gradient(\n            circle,\n            rgba(148, 148, 148, 0.02) 1px,\n            transparent 1px\n          );\n        background-position:\n          0 0,\n          5px 5px;\n        background-size: 10px 10px;\n      }\n\n      h1 {\n        color: #ff5861;\n        font-size: 64px;\n        font-weight: 900;\n        margin-top: 0.8%;\n      }\n\n      code {\n        color: #e5e9f0;\n        font-size: 24px;\n        font-weight: 500;\n      }\n\n      .uv-small {\n        color: #e5e9f0;\n        font-size: 20px;\n        font-weight: 500;\n      }\n\n      i {\n        color: #e5e9f0;\n        font-size: 20px;\n        font-weight: 900;\n        text-decoration: none;\n        font-style: normal;\n      }\n\n      .footer-spacing {\n        margin-top: 0.5%;\n      }\n\n      button {\n        display: inline-block;\n        text-decoration: none;\n        padding: 15px 50px;\n        border-radius: 8px;\n        margin: 10px;\n        margin-top: 20px;\n        transition: 0.3s ease-in-out;\n        -webkit-transition: 0.3s ease-in-out;\n        border: 1px solid rgba(255, 255, 255, 0.2);\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        -webkit-backdrop-filter: blur(10px);\n        backdrop-filter: blur(10px);\n      }\n\n      button:hover {\n        background-color: #434c5e;\n      }\n\n      .container {\n        max-width: 650px;\n      }\n\n      .list-group-item {\n        background-color: #2e3440;\n        color: #eceff4;\n      }\n\n      .list-group {\n        border-radius: 18px;\n      }\n\n      textarea {\n        border-radius: 18px;\n        outline: none;\n        resize: none;\n        border: 1px solid rgba(255, 255, 255, 0.2);\n        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n        padding: 25px;\n        box-sizing: border-box;\n        width: 450px;\n      }\n\n      .nf-fa-heart {\n        color: #ff5861;\n      }\n    "
				}
			/>
			<script
				src={
					'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
				}
				innerHTML={''}
			/>
		</>
	);
}
