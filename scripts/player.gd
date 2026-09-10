extends CharacterBody2D

@export var speed: float = 220.0

func _physics_process(_delta: float) -> void:
	var input_dir := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	velocity = input_dir * speed
	move_and_slide()
	position.x = clamp(position.x, 40.0, 1240.0)
	position.y = clamp(position.y, 40.0, 680.0)
