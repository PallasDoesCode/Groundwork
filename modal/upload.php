<center><h2>Please choose your file to upload</h2></center>
<form id="uploadForm" action="fileUpload.php" method="post" enctype="multipart/form-data">
	<label for="projectName">Project Name:</label>
	<input type="text" name="projectName" size="40" placeholder="Project Name" required>
	
	<br><br>
	
	<label for="fileaddress">File Location:</label>
	<input type="file" name="fileaddress" size="40" required>
	
	<br><br>
	
	<label for="public">Make this file public?</label>
	<input type="checkbox" name="public" class="pull-right">
	
	<br><br>
	
	<label for="useDefault">Use default conjunction list?</label>
	<input type="checkbox" name="useDefault" class="pull-right" checked>
	
	<br><br>
	
	<label for="isFormatted">Is your text file formatted?</label>
	<input type="checkbox" name="isFormatted" class="pull-right">
	
	<br><br>
	
	<center><button type="submit" name="submit">Submit Query</button></center>
</form>