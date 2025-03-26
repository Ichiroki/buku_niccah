$("form").submit(async (e) => {
	e.preventDefault();
	const idVal = $("#idtamu").val();

	const response = await fetch(`http://localhost:3000/check/${idVal}`, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw Error("jir coy gagal buat narik data user berdasarkan id");
	}

	const res = await response.json();

	console.log(res);
});
