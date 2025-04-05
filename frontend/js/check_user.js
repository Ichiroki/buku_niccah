$("form").submit(async (e) => {
	e.preventDefault();
	const idVal = $("#idtamu").val();

	await fetch(`http://localhost:3000/check/${idVal}`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw Error("Jir coy gagal buat narik data tamu berdasarkan id");
			}
			res.json();
			console.log(res);
		})
		.then(() => {
			window.location.href = "confirmation.html";
		});
});
