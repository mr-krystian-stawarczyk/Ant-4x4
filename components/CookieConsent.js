import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Button, Col, Row } from "react-bootstrap";

import { CookiesProvider, useCookies } from "react-cookie";
const CookieConsent = (props) => {
	const [showConsent, setShowConsent] = useState(true);

	const [cookies, setCookies] = useCookies(["localConsent"]);

	useEffect(() => {
		setShowConsent(hasCookie("localConsent"));
	}, []);

	const acceptCookie = () => {
		setShowConsent(true);
		setCookie("localConsent", "true", { sameSite: "none", secure: true });
	};

	if (showConsent) {
		return null;
	}

	const overlayStyle = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 9999,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backdropFilter: "blur(8px)",
	};

	return (
		<CookiesProvider>
			<div style={overlayStyle}>
				<Row className="justify-content-center text-center sticky mt-3 ">
					<Col className="bg-black rounded">
						<Col className="fixed inset-0 bg-slate-700 bg-opacity-70">
							<Col className="fixed bottom-0 left-0 right-0  flex items-center justify-between px-4 py-2 bg-gray-100">
								<Row className="overflow-auto">
									<h6 className="text-light text-base ">
										Witryna używa plików cookie. Pliki cookie są niezbędne do
										zapewnienia prawidłowego działania strony internetowej,
										personalizowania treści, dostosowywania i analizowania
										reklam oraz śledzenia ruchu na stronie. Korzystając z naszej
										witryny, wyrażasz zgodę na używanie plików cookie zgodnie z
										naszą polityką prywatności.
									</h6>
									<h6 className="text-light text-base py-1">
										Możesz zmienić ustawienia plików cookie w swojej
										przeglądarce lub skorzystać z narzędzi do zarządzania
										plikami cookie, aby zablokować lub usunąć pliki cookie.
										Jednakże, zauważ, że wyłączenie plików cookie może wpłynąć
										na niektóre funkcje i usługi dostępne na naszej stronie.
									</h6>
									<h6 className="text-light text-base ">
										Dowiedz się więcej o plikach cookie i polityce prywatności
										na stronie. Klikając „Akceptuj” lub kontynuując korzystanie
										z witryny, wyrażasz zgodę na używanie plików cookie.
									</h6>
								</Row>

								<Button
									variant="dark"
									className=" m-2"
									onClick={() => acceptCookie()}
								>
									Akceptuj
								</Button>
							</Col>
						</Col>
					</Col>
				</Row>
			</div>
		</CookiesProvider>
	);
};

export default CookieConsent;
